import { connectDB } from "../../../lib/db";
import Ledger from "../../../models/Ledger";
import { NextResponse } from "next/server";

// ✅ GET (with filters + search + pagination)
export async function GET(req) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const type = searchParams.get("type");
        const status = searchParams.get("status");
        const search = searchParams.get("search");
        const page = parseInt(searchParams.get("page")) || 1;
        const limit = parseInt(searchParams.get("limit")) || 200;

        let query = {};
        if (type) query.type = type;
        if (status) query.status = status;
        if (search) {
            query.title = { $regex: search, $options: "i" };
        }

        const skip = (page - 1) * limit;

        const data = await Ledger.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Ledger.countDocuments(query);

        return NextResponse.json({
            data,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        });

    } catch (err) {
        console.error("GET /api/ledger error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

// ✅ POST (Create Payable / Receivable)
export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();
        console.log("POST /api/ledger body:", JSON.stringify(body, null, 2));

        if (!body.title || body.amount === undefined || !body.type) {
            return NextResponse.json({ error: "Missing title, amount, or type" }, { status: 400 });
        }

        const entry = await Ledger.create({
            title: body.title,
            amount: Number(body.amount),
            type: body.type,
            date: body.date || new Date(),
            note: body.note || "",
            status: "pending"
        });

        return NextResponse.json(entry, { status: 201 });

    } catch (err) {
        console.error("POST /api/ledger ERROR:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

// ✅ PUT (Mark Completed or update fields)
export async function PUT(req) {
    try {
        await connectDB();
        const body = await req.json();
        const { id, ...updateData } = body;

        if (!id) {
            return NextResponse.json({ error: "ID required" }, { status: 400 });
        }

        console.log(`PUT /api/ledger ID: ${id} Update:`, JSON.stringify(updateData, null, 2));

        const entry = await Ledger.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

        if (!entry) {
            console.error(`Ledger entry not found for ID: ${id}`);
            return NextResponse.json({ error: "Entry not found" }, { status: 404 });
        }

        console.log(`Successfully updated Ledger entry: ${entry.title}, isAddedToTransactions: ${entry.isAddedToTransactions}`);
        return NextResponse.json(entry);

    } catch (err) {
        console.error("PUT /api/ledger ERROR:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

// ✅ DELETE
export async function DELETE(req) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "ID required" }, { status: 400 });
        }

        await Ledger.findByIdAndDelete(id);
        return NextResponse.json({ message: "Deleted successfully" });

    } catch (err) {
        console.error("DELETE /api/ledger error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}