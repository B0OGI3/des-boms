/**
 * Customer Management API Routes
 * 
 * Handles CRUD operations for customer data in the DES-BOMS system.
 * Provides RESTful endpoints for customer management functionality.
 */

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * Type definition for customer creation/update requests
 * Ensures type safety for incoming customer data
 */
type CustomerRequestBody = {
  name: string;           // Required: Customer or company name
  contact?: string;       // Optional: Primary contact person
  email: string;          // Required: Primary email (must be unique)
  phone?: string;         // Optional: Phone number
  billingAddress?: string; // Optional: Billing address
  shippingAddress?: string; // Optional: Shipping/service address
};

/**
 * GET /api/customers
 * 
 * Retrieves all customers from the database, ordered alphabetically by name.
 * Used for customer listing pages and selection dropdowns.
 * 
 * @returns Array of customer objects
 */
export async function GET() {
  const customers = await prisma.customer.findMany({
    orderBy: { name: "asc" }, // Sort alphabetically for consistent UI
  });
  return NextResponse.json(customers);
}

/**
 * POST /api/customers
 * 
 * Creates a new customer record in the database.
 * Validates required fields and handles database constraints.
 * 
 * @param req - Request object containing customer data
 * @returns Created customer object or error response
 */
export async function POST(req: Request) {
  const body: CustomerRequestBody = await req.json();
  const { name, contact, email, phone, billingAddress, shippingAddress } = body;

  // Validate required fields
  if (!name || !email) {
    return NextResponse.json(
      { error: "Name and email are required" }, 
      { status: 400 }
    );
  }

  try {
    // Create new customer record
    const newCustomer = await prisma.customer.create({
      data: { name, contact, email, phone, billingAddress, shippingAddress },
    });

    return NextResponse.json(newCustomer, { status: 201 });
  } catch (error) {
    // Handle database constraints (e.g., unique email violation)
    console.error('Error creating customer:', error);
    return NextResponse.json(
      { error: "Failed to create customer. Email may already exist." },
      { status: 500 }
    );
  }
}
