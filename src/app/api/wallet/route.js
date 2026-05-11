import { connectDB } from "../../../lib/db";
import Transaction from "../../../models/Transaction";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();

        const stats = await Transaction.aggregate([
            {
                $group: {
                    _id: null,
                    totalIncome: {
                        $sum: { $cond: [{ $eq: [{ $toLower: "$type" }, "income"] }, "$amount", 0] }
                    },
                    totalExpense: {
                        $sum: { $cond: [{ $eq: [{ $toLower: "$type" }, "expense"] }, "$amount", 0] }
                    },
                    cashIncome: {
                        $sum: {
                            $cond: [
                                {
                                    $and: [
                                        { $eq: [{ $toLower: "$type" }, "income"] },
                                        { $eq: [{ $toLower: "$wallet" }, "cash"] }
                                    ]
                                },
                                "$amount",
                                0
                            ]
                        }
                    },
                    cashExpense: {
                        $sum: {
                            $cond: [
                                {
                                    $and: [
                                        { $eq: [{ $toLower: "$type" }, "expense"] },
                                        { $eq: [{ $toLower: "$wallet" }, "cash"] }
                                    ]
                                },
                                "$amount",
                                0
                            ]
                        }
                    },
                    onlineIncome: {
                        $sum: {
                            $cond: [
                                {
                                    $and: [
                                        { $eq: [{ $toLower: "$type" }, "income"] },
                                        { $or: [{ $eq: [{ $toLower: "$wallet" }, "online"] }, { $eq: [{ $toLower: "$wallet" }, "bank"] }] }
                                    ]
                                },
                                "$amount",
                                0
                            ]
                        }
                    },
                    onlineExpense: {
                        $sum: {
                            $cond: [
                                {
                                    $and: [
                                        { $eq: [{ $toLower: "$type" }, "expense"] },
                                        { $or: [{ $eq: [{ $toLower: "$wallet" }, "online"] }, { $eq: [{ $toLower: "$wallet" }, "bank"] }] }
                                    ]
                                },
                                "$amount",
                                0
                            ]
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    income: "$totalIncome",
                    expense: "$totalExpense",
                    balance: { $subtract: ["$totalIncome", "$totalExpense"] },
                    cash: { $subtract: ["$cashIncome", "$cashExpense"] },
                    online: { $subtract: ["$onlineIncome", "$onlineExpense"] }
                }
            }
        ]);

        const result = stats[0] || {
            balance: 0,
            income: 0,
            expense: 0,
            cash: 0,
            online: 0
        };

        return NextResponse.json(result);

    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}