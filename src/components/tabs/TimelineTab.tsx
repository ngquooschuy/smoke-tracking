import React, { useState, useEffect } from 'react';
import { ApiService } from '../../services/api.service.ts';
import { ITimelineEvent } from '../../models/timeline.model.ts';
import { ISmokeLog } from '../../models/smoke-log.model.ts';

interface TimelineTabProps {
  relapses: ISmokeLog[];
  cravingsResisted: number;
}

const REASON_LABELS: Record<string, string> = {
  STRESS: 'Căng thẳng / Áp lực',
  AFTER_MEAL: 'Sau khi ăn no',
  SOCIAL: 'Tiệc tùng / Bạn bè rủ',
  BOREDOM: 'Buồn chán / Trống rỗng',
  HABIT: 'Thói quen vô thức',
  COFFEE: 'Uống cà phê'
};

export const TimelineTab: React.FC<TimelineTabProps> = ({ relapses, cravingsResisted }) => {
  const [events, setEvents] = useState<ITimelineEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch timeline from API, with fallback to local state relapses
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    ApiService.getTimeline()
      .then((res) => {
        if (isMounted && res && res.timeline) {
          setEvents(res.timeline);
        }
      })
      .catch((err) => {
        console.warn('Could not fetch timeline from API, using local relapses:', err.message);
        if (isMounted) {
          const fallbackEvents: ITimelineEvent[] = (relapses || [])
            .map((item, idx) => {
              const d = new Date(item.time);
              return {
                id: item.id || `r_${idx}`,
                type: 'SMOKE' as const,
                title: 'Hút 1 điếu thuốc',
                reason: REASON_LABELS[item.reason] || item.reason || 'Không rõ lý do',
                rawReason: item.reason,
                time: item.time,
                formattedTime: d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
                formattedDate: d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
                hpImpact: -10,
                hpText: '-10% Máu'
              };
            })
            .reverse();
          setEvents(fallbackEvents);
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [relapses]);

  const totalSmoked = relapses ? relapses.length : events.length;
  const currentHp = Math.max(0, 100 - totalSmoked * 10);

  return (
    <div className="space-y-4">
      {/* Overview Stats Bar */}
      <section className="bg-surface-variant border-4 border-pixel-black pixel-shadow p-5 relative overflow-hidden">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="font-display-lg text-lg text-lemon-shock uppercase font-bold tracking-wide flex items-center gap-2">
              <span className="material-symbols-outlined text-2xl">timeline</span>
              DÒNG THỜI GIAN (TIMELINE)
            </h2>
            <p className="text-xs text-on-surface-variant mt-1">
              Nhật ký chi tiết các sự kiện hút thuốc & tác động sinh lực
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="bg-pixel-black border-2 border-error text-error px-3 py-1.5 text-xs font-bold pixel-shadow-sm flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">smoking_rooms</span>
              ĐÃ HÚT: {totalSmoked} ĐIẾU
            </div>
            <div className="bg-pixel-black border-2 border-lemon-shock text-lemon-shock px-3 py-1.5 text-xs font-bold pixel-shadow-sm flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">shield</span>
              SOS: {cravingsResisted} LẦN
            </div>
            <div className="bg-pixel-black border-2 border-primary-container text-primary-container px-3 py-1.5 text-xs font-bold pixel-shadow-sm flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">favorite</span>
              HP: {currentHp}%
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Feed Container */}
      <section className="bg-surface border-4 border-pixel-black pixel-shadow p-4 md:p-6">
        {loading ? (
          <div className="py-12 text-center text-on-surface-variant text-sm flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-primary-container border-t-transparent animate-spin"></div>
            <span>Đang tải dòng thời gian...</span>
          </div>
        ) : events.length === 0 ? (
          <div className="py-12 text-center flex flex-col items-center justify-center p-6 border-2 border-dashed border-pixel-black bg-surface-variant">
            <span className="material-symbols-outlined text-5xl text-primary-container mb-2">
              verified
            </span>
            <h3 className="font-display-lg text-base text-lemon-shock uppercase font-bold">
              Phổi Trong Sạch!
            </h3>
            <p className="text-xs text-on-surface-variant mt-1 max-w-xs">
              Chưa có lần hút thuốc nào được ghi nhận. Bạn đang duy trì 100% HP trọn vẹn!
            </p>
          </div>
        ) : (
          <div className="relative pl-6 md:pl-8 space-y-6 before:absolute before:left-2 md:before:left-3 before:top-2 before:bottom-2 before:w-1 before:bg-pixel-black">
            {events.map((event, idx) => (
              <div key={event.id || idx} className="relative group">
                {/* Timeline Dot */}
                <div className="absolute -left-6 md:-left-8 top-1.5 w-5 h-5 bg-error border-2 border-pixel-black flex items-center justify-center pixel-shadow-sm">
                  <div className="w-1.5 h-1.5 bg-pixel-black"></div>
                </div>

                {/* Event Card */}
                <div className="bg-surface-variant border-3 border-pixel-black pixel-shadow-sm p-4 hover:border-error transition-all">
                  <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-xl text-error">heart_broken</span>
                      <h4 className="font-display-lg text-sm md:text-base text-on-surface font-bold uppercase">
                        {event.title}
                      </h4>
                    </div>
                    <span className="bg-error text-pixel-black font-display-lg text-xs font-bold px-2 py-0.5 border border-pixel-black">
                      {event.hpText || '-10% MÁU'}
                    </span>
                  </div>

                  <div className="text-xs text-on-surface-variant mb-2">
                    <span className="font-bold text-lemon-shock">Lý do: </span>
                    {event.reason}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-on-surface-variant border-t border-pixel-black/20 pt-2">
                    <span className="flex items-center gap-1 font-mono">
                      <span className="material-symbols-outlined text-xs">schedule</span>
                      {event.formattedTime}
                    </span>
                    <span className="flex items-center gap-1 font-mono">
                      <span className="material-symbols-outlined text-xs">calendar_month</span>
                      {event.formattedDate}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
