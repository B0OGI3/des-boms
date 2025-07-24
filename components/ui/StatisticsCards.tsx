/**
 * Generic StatisticsCards component for displaying key metrics
 */

import React from 'react';
import { Card, Text } from '@mantine/core';

export interface StatisticCard {
  id: string;
  title: string;
  value: number | string;
  subtitle?: string;
  color?: string;
  gradient?: string;
  bgAccent?: string;
  shadowColor?: string;
  onClick?: () => void;
  isActive?: boolean;
}

export interface StatisticsCardsProps {
  cards: StatisticCard[];
  gap?: number;
}

export const StatisticsCards: React.FC<StatisticsCardsProps> = ({
  cards,
  gap = 24,
}) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(auto-fit, minmax(220px, 1fr))`,
        gap,
        marginBottom: 32,
      }}
    >
      {cards.map((card) => (
        <Card
          key={card.id}
          padding="xl"
          onClick={card.onClick}
          style={{
            background: `linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.95))`,
            border: card.isActive 
              ? "2px solid rgba(59, 130, 246, 0.5)" 
              : "1px solid rgba(51, 65, 85, 0.4)",
            borderRadius: "16px",
            textAlign: "center",
            boxShadow: `0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.02)`,
            backdropFilter: "blur(16px)",
            position: "relative",
            overflow: "hidden",
            minHeight: "120px",
            cursor: card.onClick ? "pointer" : "default",
            transform: card.isActive ? "translateY(-2px)" : "translateY(0)",
            transition: "all 0.2s ease",
          }}
        >
          {/* Background accent */}
          {card.bgAccent && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: card.bgAccent,
                opacity: 0.3,
                borderRadius: "12px",
              }}
            />
          )}
          
          {/* Top border */}
          {card.gradient && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "2px",
                background: card.gradient,
                borderRadius: "12px 12px 0 0",
              }}
            />
          )}
          
          {/* Value */}
          <Text 
            size="lg" 
            fw={700} 
            style={{ 
              color: "#cbd5e1", 
              marginBottom: 8, 
              fontSize: "1.5rem", 
              position: "relative",
              textShadow: "0 2px 8px rgba(0,0,0,0.5)",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              marginTop: "24px",
            }}
          >
            {card.value}
          </Text>
          
          {/* Title */}
          <Text 
            size="sm" 
            style={{ 
              color: "#94a3b8", 
              marginBottom: 8, 
              fontWeight: 600, 
              position: "relative",
              fontSize: "0.9rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            {card.title}
          </Text>
          
          {/* Subtitle */}
          {card.subtitle && (
            <Text 
              size="xs" 
              style={{ 
                color: "#64748b", 
                position: "relative",
                fontSize: "0.8rem",
                fontWeight: 500,
              }}
            >
              {card.subtitle}
            </Text>
          )}
        </Card>
      ))}
    </div>
  );
};
