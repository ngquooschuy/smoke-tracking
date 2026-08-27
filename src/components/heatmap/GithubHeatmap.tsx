import React, { useState, useMemo } from 'react';
import { HeatmapRect } from '@visx/heatmap';
import { scaleLinear } from '@visx/scale';
import { IActivityDay, IHeatmapStats } from '../../models/heatmap.model.ts';
import { THEME_COLORS } from '../../constants/theme.constants.ts';
import { audioService } from '../../services/audio.service.ts';

interface GithubHeatmapProps {
  activityCalendar: IActivityDay[];
  stats: IHeatmapStats;
  onSelectDay?: (day: IActivityDay) => void;
}

interface HeatmapBin {
  bin: number; // Day of week (0 = CN, 1 = T2, ..., 6 = T7)
  count: number;
  day: IActivityDay | null;
}

interface HeatmapColumn {
  bin: number; // Week index
  monthLabel?: string;
  bins: HeatmapBin[];
}

const CELL_SIZE = 13;
const CELL_GAP = 3;
const X_OFFSET = 26; // Space for weekday labels
const Y_OFFSET = 18; // Space for month labels
const WEEKDAY_NAMES = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

function getCellColor(day: IActivityDay | null): string {
  if (!day) return '#10170e';
  if (day.isFuture) return '#0c1609';
  if (day.count === 0) return '#182214'; // Clean smoke-free
  if (day.count === 1) return THEME_COLORS.primaryContainer; // 1 cig
  if (day.count === 2) return THEME_COLORS.lemonShock; // 2 cigs
  if (day.count === 3) return THEME_COLORS.secondary; // 3 cigs
  return THEME_COLORS.error; // 4+ cigs
}

export const GithubHeatmap: React.FC<GithubHeatmapProps> = ({
  activityCalendar,
  stats,
  onSelectDay
}) => {
  const [selectedDay, setSelectedDay] = useState<IActivityDay | null>(
    activityCalendar[activityCalendar.length - 1] || null
  );
  const [hoveredDay, setHoveredDay] = useState<IActivityDay | null>(null);

  // Group activityCalendar into 7xN weekly columns for @visx/heatmap
  const heatmapData: HeatmapColumn[] = useMemo(() => {
    if (!activityCalendar || activityCalendar.length === 0) return [];

    const columns: HeatmapColumn[] = [];
    let currentWeek: HeatmapBin[] = [];

    activityCalendar.forEach((day) => {
      const dateObj = new Date(day.date);
      const dayOfWeek = dateObj.getDay(); // 0: Sunday ... 6: Saturday

      // If Sunday and we have days, push completed week
      if (dayOfWeek === 0 && currentWeek.length > 0) {
        columns.push({
          bin: columns.length,
          bins: currentWeek
        });
        currentWeek = [];
      }

      currentWeek.push({
        bin: dayOfWeek,
        count: day.count,
        day
      });
    });

    if (currentWeek.length > 0) {
      columns.push({
        bin: columns.length,
        bins: currentWeek
      });
    }

    return columns;
  }, [activityCalendar]);

  const numColumns = Math.max(heatmapData.length, 1);
  const svgWidth = X_OFFSET + numColumns * (CELL_SIZE + CELL_GAP) + 10;
  const svgHeight = Y_OFFSET + 7 * (CELL_SIZE + CELL_GAP) + 6;

  const xScale = useMemo(
    () =>
      scaleLinear<number>({
        domain: [0, numColumns],
        range: [0, numColumns * (CELL_SIZE + CELL_GAP)]
      }),
    [numColumns]
  );

  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        domain: [0, 7],
        range: [0, 7 * (CELL_SIZE + CELL_GAP)]
      }),
    []
  );

  const handleCellClick = (day: IActivityDay | null) => {
    if (!day) return;
    audioService.click();
    setSelectedDay(day);
    if (onSelectDay) onSelectDay(day);
  };

  const activeDisplayDay = hoveredDay || selectedDay;

  return (
    <section className="bg-surface-variant border-4 border-pixel-black pixel-shadow p-4 md:p-6">
      <div className="flex items-center justify-between mb-4 border-b-2 border-pixel-black pb-2 flex-wrap gap-2">
        <div>
          <h3 className="font-display-lg text-sm md:text-base text-lemon-shock uppercase font-bold tracking-wider flex items-center gap-1.5">
            <span className="material-symbols-outlined text-lg">grid_view</span>
            MA TRẬN KHÔNG KHÓI (@VISX/HEATMAP)
          </h3>
          <div className="text-[11px] text-on-surface-variant mt-0.5">
            {stats.perfectDays}/{stats.totalLoggedDays} ngày hoàn hảo ({stats.cleanRate}% Sạch Khói)
          </div>
        </div>
        <div className="bg-pixel-black border-2 border-primary-container text-primary-container px-2.5 py-1 text-xs font-bold tracking-wide flex items-center gap-1">
          CHUỖI: {stats.currentStreak} NGÀY <span className="text-lemon-shock">🔥</span>
        </div>
      </div>

      {/* Visx Heatmap Container */}
      <div className="overflow-x-auto pb-2 flex justify-start md:justify-center border-2 border-pixel-black bg-surface p-3 pixel-shadow-sm mb-3">
        <svg width={svgWidth} height={svgHeight} className="select-none font-mono">
          {/* Weekday labels */}
          <g transform={`translate(0, ${Y_OFFSET})`}>
            {[1, 3, 5].map((dayIdx) => (
              <text
                key={dayIdx}
                x={0}
                y={dayIdx * (CELL_SIZE + CELL_GAP) + CELL_SIZE - 2}
                fontSize={9}
                fill="#baccb0"
                fontFamily="inherit"
                fontWeight="bold"
              >
                {WEEKDAY_NAMES[dayIdx]}
              </text>
            ))}
          </g>

          {/* Month labels along the top */}
          <g transform={`translate(${X_OFFSET}, 11)`}>
            {heatmapData.map((col, idx) => {
              if (idx % 4 === 0) {
                const firstDay = col.bins[0]?.day;
                if (firstDay) {
                  const m = new Date(firstDay.date).getMonth() + 1;
                  return (
                    <text
                      key={idx}
                      x={idx * (CELL_SIZE + CELL_GAP)}
                      y={0}
                      fontSize={9}
                      fill="#CCFF00"
                      fontFamily="inherit"
                      fontWeight="bold"
                    >
                      T{m}
                    </text>
                  );
                }
              }
              return null;
            })}
          </g>

          {/* Heatmap Rects */}
          <HeatmapRect<HeatmapColumn, HeatmapBin>
            data={heatmapData}
            xScale={xScale}
            yScale={yScale}
            top={Y_OFFSET}
            left={X_OFFSET}
            binWidth={CELL_SIZE}
            binHeight={CELL_SIZE}
            gap={CELL_GAP}
            bins={(d) => d.bins}
            count={(d) => d.count}
          >
            {(heatmap) =>
              heatmap.map((bins) =>
                bins.map((cell) => {
                  const day = cell.bin.day;
                  const isSelected = selectedDay && day && selectedDay.date === day.date;
                  const isToday = day?.isToday;
                  const fillColor = getCellColor(day);

                  return (
                    <rect
                      key={`heatmap-rect-${cell.row}-${cell.column}`}
                      x={cell.x}
                      y={cell.y}
                      width={cell.width}
                      height={cell.height}
                      fill={fillColor}
                      stroke={isSelected ? '#CCFF00' : isToday ? '#39ff14' : '#000000'}
                      strokeWidth={isSelected ? 2 : isToday ? 1.5 : 1}
                      className="cursor-pointer transition-all duration-75 hover:opacity-80"
                      onClick={() => handleCellClick(day)}
                      onMouseEnter={() => setHoveredDay(day)}
                      onMouseLeave={() => setHoveredDay(null)}
                    />
                  );
                })
              )
            }
          </HeatmapRect>
        </svg>
      </div>

      {/* Selected / Hovered Day Info Pill */}
      {activeDisplayDay && (
        <div className="p-2.5 bg-pixel-black border-2 border-pixel-black text-xs font-bold flex items-center justify-between mb-3 text-on-surface">
          <span className="text-lemon-shock flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm">calendar_today</span>
            {activeDisplayDay.fullDayName || activeDisplayDay.date}
            {activeDisplayDay.isToday && <span className="text-primary-container">(Hôm nay)</span>}
          </span>
          {activeDisplayDay.count === 0 ? (
            <span className="text-primary-container font-bold">0 điếu • PERFECT ⭐</span>
          ) : (
            <span className="text-error font-bold">
              {activeDisplayDay.count} điếu thuốc • -{activeDisplayDay.count * 15} HP
            </span>
          )}
        </div>
      )}

      {/* Heatmap Legend */}
      <div className="flex items-center justify-between text-[11px] font-bold text-on-surface-variant border-t border-surface-bright pt-2 flex-wrap gap-2">
        <span className="uppercase text-[10px]">Cấp độ:</span>
        <div className="flex items-center gap-2.5 text-[10px] md:text-xs">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-[#182214] border border-pixel-black inline-block"></span> 0 (Sạch)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-primary-container border border-pixel-black inline-block"></span> 1
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-lemon-shock border border-pixel-black inline-block"></span> 2
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-secondary border border-pixel-black inline-block"></span> 3
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-error border border-pixel-black inline-block"></span> 4+
          </span>
        </div>
      </div>
    </section>
  );
};
