import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";

const data = [
  {
    hour: 12,
    entrances: 240,
  },
  {
    hour: 13,
    entrances: 300,
  },
  {
    hour: 14,
    entrances: 200,
  },
  {
    hour: 15,
    entrances: 278,
  },
  {
    hour: 16,
    entrances: 189,
  },
  {
    hour: 17,
    entrances: 239,
  },
  {
    hour: 18,
    entrances: 278,
  },
  {
    hour: 19,
    entrances: 189,
  },
  {
    hour: 20,
    entrances: 278,
  },
  {
    hour: 21,
    entrances: 239,
  },
  {
    hour: 22,
    entrances: 300,
  },
  {
    hour: 23,
    entrances: 240,
  },
];

export function HoursChart() {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-normal">
          Most Active Hours
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {new Date().toLocaleDateString("en-us", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
        <div className="mt-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Entrances
                            </span>
                            <span className="font-bold text-muted-foreground">
                              {payload[0].value}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return null;
                }}
              />
              <XAxis dataKey="hour" />
              <Bar
                dataKey="entrances"
                style={
                  {
                    fill: "var(--theme-primary)",
                    opacity: 1,
                    "--theme-primary": "hsl(var(--primary))",
                  } as React.CSSProperties
                }
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
