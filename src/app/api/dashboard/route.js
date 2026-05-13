import { connectDB } from "../../../lib/db";
import Transaction from "../../../models/Transaction";
import Ledger from "../../../models/Ledger";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();

        // 1. Fetch Wallet Stats (Income, Expense, Balance, Cash, Online)
        const walletStats = await Transaction.aggregate([
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

        const walletResult = walletStats[0] || {
            income: 0, expense: 0, balance: 0, cash: 0, online: 0
        };

        // 2. Fetch Ledger Stats (Payable, Receivable)
        const ledgerStats = await Ledger.aggregate([
            {
                $group: {
                    _id: null,
                    totalPayable: {
                        $sum: {
                            $cond: [
                                { $and: [{ $eq: ["$type", "payable"], $eq: ["$status", "pending"] }] },
                                "$amount",
                                0
                            ]
                        }
                    },
                    totalReceivable: {
                        $sum: {
                            $cond: [
                                { $and: [{ $eq: ["$type", "receivable"], $eq: ["$status", "pending"] }] },
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
                    payable: "$totalPayable",
                    receivable: "$totalReceivable"
                }
            }
        ]);

        const ledgerResult = ledgerStats[0] || { payable: 0, receivable: 0 };

        // 3. Recent Transactions
        const recentTransactions = await Transaction.find()
            .sort({ date: -1 })
            .limit(5);

        // 4. Monthly Data (Chart)
        const fiveMonthsAgo = new Date();
        fiveMonthsAgo.setMonth(fiveMonthsAgo.getMonth() - 5);

        const chartStats = await Transaction.aggregate([
            {
                $match: {
                    date: { $gte: fiveMonthsAgo }
                }
            },
            {
                $group: {
                    _id: {
                        month: { $month: "$date" },
                        year: { $year: "$date" }
                    },
                    income: {
                        $sum: { $cond: [{ $eq: [{ $toLower: "$type" }, "income"] }, "$amount", 0] }
                    },
                    expense: {
                        $sum: { $cond: [{ $eq: [{ $toLower: "$type" }, "expense"] }, "$amount", 0] }
                    }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]);

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const chartData = chartStats.map(item => ({
            month: monthNames[item._id.month - 1],
            income: item.income,
            expense: item.expense
        }));

        return NextResponse.json({
            stats: {
                ...walletResult,
                ...ledgerResult,
                netBalance: walletResult.balance + ledgerResult.receivable - ledgerResult.payable
            },
            recentTransactions,
            chartData
        });

    } catch (err) {
        console.error("Dashboard API Error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
