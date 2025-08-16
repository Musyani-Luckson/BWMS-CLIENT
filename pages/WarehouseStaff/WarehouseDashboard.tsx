"use client";

import type React from "react";
import { useState } from "react";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../../src/components/ui/card";
import { Badge } from "../../src/components/ui/badge";
import { Button } from "../../src/components/ui/button";
import {
	Package,
	MapPin,
	AlertTriangle,
	CheckCircle,
	Plus,
} from "lucide-react";

interface WarehouseSummary {
	totalItems: number;
	lowStockItems: number;
	damagedItems: number;
	pendingRequests: number;
	completedToday: number;
	locationsManaged: number;
}

interface RecentActivity {
	id: string;
	type: "stock_added" | "stock_moved" | "damage_reported" | "request_processed";
	itemName: string;
	quantity?: number;
	fromLocation?: string;
	toLocation?: string;
	timestamp: Date;
	status: "completed" | "in-progress" | "pending";
}

interface WarehouseDashboardProps {
	onNavigate?: (
		page: "dashboard" | "move-stock" | "requests" | "alerts" | "add-stock"
	) => void;
}

const WarehouseDashboard: React.FC<WarehouseDashboardProps> = ({
	onNavigate,
}) => {
	const [summary] = useState<WarehouseSummary>({
		totalItems: 1247,
		lowStockItems: 23,
		damagedItems: 5,
		pendingRequests: 12,
		completedToday: 8,
		locationsManaged: 15,
	});

	const [recentActivities] = useState<RecentActivity[]>([
		{
			id: "1",
			type: "stock_added",
			itemName: "Office Supplies - A4 Paper",
			quantity: 100,
			toLocation: "Warehouse A-1",
			timestamp: new Date("2024-03-15T10:30:00"),
			status: "completed",
		},
		{
			id: "2",
			type: "stock_moved",
			itemName: "Computer Equipment - Laptops",
			quantity: 5,
			fromLocation: "Warehouse A-2",
			toLocation: "IT Storage",
			timestamp: new Date("2024-03-15T11:15:00"),
			status: "completed",
		},
		{
			id: "3",
			type: "damage_reported",
			itemName: "Furniture - Office Chairs",
			quantity: 2,
			fromLocation: "Warehouse B-1",
			timestamp: new Date("2024-03-15T12:00:00"),
			status: "completed",
		},
		{
			id: "4",
			type: "request_processed",
			itemName: "Medical Supplies - First Aid Kits",
			quantity: 10,
			fromLocation: "Medical Storage",
			timestamp: new Date("2024-03-15T13:30:00"),
			status: "in-progress",
		},
	]);

	const getActivityIcon = (type: string) => {
		switch (type) {
			case "stock_added":
				return <Plus className="h-4 w-4 text-green-600" />;
			case "stock_moved":
				return <MapPin className="h-4 w-4 text-blue-600" />;
			case "damage_reported":
				return <AlertTriangle className="h-4 w-4 text-red-600" />;
			case "request_processed":
				return <CheckCircle className="h-4 w-4 text-purple-600" />;
			default:
				return <Package className="h-4 w-4 text-gray-600" />;
		}
	};

	const getActivityDescription = (activity: RecentActivity) => {
		switch (activity.type) {
			case "stock_added":
				return `Added ${activity.quantity} units to ${activity.toLocation}`;
			case "stock_moved":
				return `Moved ${activity.quantity} units from ${activity.fromLocation} to ${activity.toLocation}`;
			case "damage_reported":
				return `Reported ${activity.quantity} damaged units in ${activity.fromLocation}`;
			case "request_processed":
				return `Processing ${activity.quantity} units from ${activity.fromLocation}`;
			default:
				return "Unknown activity";
		}
	};

	const getStatusBadgeColor = (status: string) => {
		const colors = {
			completed: "bg-green-100 text-green-800",
			"in-progress": "bg-blue-100 text-blue-800",
			pending: "bg-yellow-100 text-yellow-800",
		};
		return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
	};

	return (
		<div className="p-6 space-y-6 bg-gray-50 min-h-screen">
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-2">
					<Package className="h-8 w-8 text-blue-600" />
					<h1 className="text-3xl font-bold text-gray-900">
						Warehouse Dashboard
					</h1>
				</div>
				<Button className="bg-blue-600 hover:bg-blue-700">
					<Plus className="h-4 w-4 mr-2" />
					Quick Action
				</Button>
			</div>

			{/* Summary Cards */}
			<div className="grid grid-cols-1 md:grid-cols-6 gap-6">
				<Card>
					<CardContent className="pt-6">
						<div className="text-center">
							<div className="text-2xl font-bold text-blue-600">
								{summary.totalItems}
							</div>
							<div className="text-sm text-gray-600">Total Items</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="pt-6">
						<div className="text-center">
							<div className="text-2xl font-bold text-yellow-600">
								{summary.lowStockItems}
							</div>
							<div className="text-sm text-gray-600">Low Stock</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="pt-6">
						<div className="text-center">
							<div className="text-2xl font-bold text-red-600">
								{summary.damagedItems}
							</div>
							<div className="text-sm text-gray-600">Damaged</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="pt-6">
						<div className="text-center">
							<div className="text-2xl font-bold text-purple-600">
								{summary.pendingRequests}
							</div>
							<div className="text-sm text-gray-600">Pending Requests</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="pt-6">
						<div className="text-center">
							<div className="text-2xl font-bold text-green-600">
								{summary.completedToday}
							</div>
							<div className="text-sm text-gray-600">Completed Today</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="pt-6">
						<div className="text-center">
							<div className="text-2xl font-bold text-gray-600">
								{summary.locationsManaged}
							</div>
							<div className="text-sm text-gray-600">Locations</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Quick Actions */}
			<Card>
				<CardHeader>
					<CardTitle>Quick Actions</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
						<Button
							variant="outline"
							className="h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
							onClick={() => onNavigate?.("add-stock")}
						>
							<Plus className="h-6 w-6" />
							<span>Add Stock</span>
						</Button>
						<Button
							variant="outline"
							className="h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
							onClick={() => onNavigate?.("move-stock")}
						>
							<MapPin className="h-6 w-6" />
							<span>Move Stock</span>
						</Button>
						<Button
							variant="outline"
							className="h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
							onClick={() => onNavigate?.("alerts")}
						>
							<AlertTriangle className="h-6 w-6" />
							<span>Report Damage</span>
						</Button>
						<Button
							variant="outline"
							className="h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
							onClick={() => onNavigate?.("requests")}
						>
							<CheckCircle className="h-6 w-6" />
							<span>Process Requests</span>
						</Button>
					</div>
				</CardContent>
			</Card>

			{/* Recent Activities */}
			<Card>
				<CardHeader>
					<CardTitle>Recent Activities</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{recentActivities.map((activity) => (
							<div
								key={activity.id}
								className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
							>
								<div className="flex items-center space-x-4">
									<div className="flex-shrink-0">
										{getActivityIcon(activity.type)}
									</div>
									<div>
										<div className="font-semibold">{activity.itemName}</div>
										<div className="text-sm text-gray-600">
											{getActivityDescription(activity)}
										</div>
										<div className="text-xs text-gray-500">
											{activity.timestamp.toLocaleString()}
										</div>
									</div>
								</div>
								<div className="flex items-center space-x-2">
									<Badge className={getStatusBadgeColor(activity.status)}>
										{activity.status.replace("-", " ").toUpperCase()}
									</Badge>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Warehouse Status */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<Card>
					<CardHeader>
						<CardTitle>Warehouse Efficiency</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-2">
									<div className="w-3 h-3 bg-green-500 rounded-full"></div>
									<span className="text-sm">Processing Speed</span>
								</div>
								<div className="text-sm font-semibold">95%</div>
							</div>
							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-2">
									<div className="w-3 h-3 bg-blue-500 rounded-full"></div>
									<span className="text-sm">Accuracy Rate</span>
								</div>
								<div className="text-sm font-semibold">98.5%</div>
							</div>
							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-2">
									<div className="w-3 h-3 bg-purple-500 rounded-full"></div>
									<span className="text-sm">Space Utilization</span>
								</div>
								<div className="text-sm font-semibold">87%</div>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Today's Performance</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-center py-4">
							<div className="text-3xl font-bold text-green-600">+12%</div>
							<div className="text-sm text-gray-600">Above daily target</div>
							<div className="mt-4 text-xs text-gray-500">
								Excellent performance in stock processing and organization today
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default WarehouseDashboard;
