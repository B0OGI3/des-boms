/**
 * API route for search suggestions
 */

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';

    if (query.length < 2) {
      return NextResponse.json({ suggestions: [] });
    }

    // Mock suggestions based on search term
    const mockSuggestions = [
      // Batch suggestions
      `Batch B000${Math.floor(Math.random() * 999) + 1}`,
      `B${String(Math.floor(Math.random() * 999999) + 1).padStart(6, '0')}`,
      
      // Part suggestions
      `Part P${Math.floor(Math.random() * 9999) + 1000}`,
      `Component ${query.toUpperCase()}`,
      `${query} Assembly`,
      
      // Customer suggestions
      `${query} Manufacturing`,
      `${query} Industries`,
      `${query} Corp`,
      
      // Order suggestions
      `SO-${Math.floor(Math.random() * 9999) + 1000}`,
      `PO-${query.toUpperCase()}-${Math.floor(Math.random() * 999) + 1}`,
    ];

    // Filter suggestions that contain the query term
    const filteredSuggestions = mockSuggestions
      .filter(suggestion => 
        suggestion.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 8); // Limit to 8 suggestions

    return NextResponse.json({ 
      suggestions: filteredSuggestions,
      query 
    });

  } catch (error) {
    console.error('Error generating search suggestions:', error);
    
    return NextResponse.json(
      { error: 'Failed to generate suggestions', suggestions: [] },
      { status: 500 }
    );
  }
}
