import { connectDB } from "../../../lib/db";
import Transaction from "../../../models/Transaction";
import { NextResponse } from "next/server";

// ✅ GET (with filters + search + pagination + date + status)
export async function GET(req) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);

        const type = searchParams.get("type");
        const category = searchParams.get("category");
        const wallet = searchParams.get("wallet");
        const status = searchParams.get("status");
        const search = searchParams.get("search");
        const fromDate = searchParams.get("fromDate");
        const toDate = searchParams.get("toDate");

        const page = parseInt(searchParams.get("page")) || 1;
        const limit = parseInt(searchParams.get("limit")) || 10;

        let query = {};

        if (type) query.type = { $regex: new RegExp(`^${type}$`, "i") };
        if (category) query.category = { $regex: new RegExp(`^${category}$`, "i") };
        if (wallet) {
            const w = wallet.toLowerCase();
            if (w === "online" || w === "bank") {
                query.wallet = { $regex: /^(online|bank)$/i };
            } else {
                query.wallet = { $regex: new RegExp(`^${wallet}$`, "i") };
            }
        }
        if (status) query.status = { $regex: new RegExp(`^${status}$`, "i") };

        if (search) {
            query.title = { $regex: search, $options: "i" };
        }

        if (fromDate || toDate) {
            query.date = {};
            if (fromDate) query.date.$gte = new Date(fromDate);
            if (toDate) query.date.$lte = new Date(toDate);
        }

        const skip = (page - 1) * limit;

        const data = await Transaction.find(query)
            .sort({ date: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Transaction.countDocuments(query);

        return NextResponse.json({
            data,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        });

    } catch (err) {
        console.error("GET /api/transaction error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

// ✅ POST (create transaction)
export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();
        console.log("POST /api/transaction body:", JSON.stringify(body, null, 2));

        // Validate required fields manually (allowing 0 for amount)
        if (!body.title || body.amount === undefined || body.amount === null || !body.type) {
            return NextResponse.json({ 
                error: "Missing required fields: title, amount, and type are required." 
            }, { status: 400 });
        }

        let walletValue = body.wallet?.toLowerCase() || "cash";
        if (walletValue === "bank") walletValue = "online";

        const transactionData = {
            title: body.title,
            amount: parseFloat(body.amount),
            type: body.type.toLowerCase(),
            category: body.category || "Other",
            wallet: walletValue,
            status: body.status?.toLowerCase() || "paid",
            date: body.date || new Date(),
            dueDate: body.dueDate || null,
            note: body.note || "",
        };

        const transaction = await Transaction.create(transactionData);
        console.log("Transaction created:", transaction._id);

        return NextResponse.json(transaction, { status: 201 });

    } catch (err) {
        console.error("POST /api/transaction ERROR:", err);
        return NextResponse.json({ 
            error: err.message,
            details: err.errors ? Object.keys(err.errors).map(key => err.errors[key].message) : null
        }, { status: 500 });
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

        await Transaction.findByIdAndDelete(id);
        return NextResponse.json({ message: "Deleted successfully" });

    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

// ✅ UPDATE (edit + mark paid/pending)
export async function PUT(req) {
    try {
        await connectDB();
        const body = await req.json();
        const { id, ...updateData } = body;

        if (!id) {
            return NextResponse.json({ error: "ID required" }, { status: 400 });
        }

        const updated = await Transaction.findByIdAndUpdate(
            id,
            {
                ...updateData,
                type: updateData.type?.toLowerCase(),
                status: updateData.status?.toLowerCase(),
                wallet: updateData.wallet?.toLowerCase() || "cash"
            },
            { new: true, runValidators: true }
        );

        if (!updated) {
            return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
        }

        return NextResponse.json(updated);

    } catch (err) {
        console.error("PUT /api/transaction error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}