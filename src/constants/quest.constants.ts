import { IQuest } from '../models/quest.model.ts';

export const INITIAL_QUESTS: IQuest[] = [
  {
    id: 'q1',
    title: 'Uống 1 cốc nước lạnh khi thèm thuốc',
    desc: 'Dập tắt ngọn lửa nicotine tức thì bằng nước tinh khiết.',
    exp: 5000,
    hp: 5,
    completed: false,
    claimed: false,
    icon: 'water_drop'
  },
  {
    id: 'q2',
    title: 'Hít thở sâu 3 phút với SOS Mode',
    desc: 'Hoàn thành 1 lượt hít thở 8-bit để hạ xung thần kinh.',
    exp: 10000,
    hp: 10,
    completed: false,
    claimed: false,
    icon: 'air'
  },
  {
    id: 'q3',
    title: '24 Giờ Phổi Sạch (Giữ vạch Perfect)',
    desc: 'Không chạm 1 điếu thuốc trong 24 giờ liên tiếp.',
    exp: 25000,
    hp: 15,
    completed: false,
    claimed: false,
    icon: 'verified'
  },
  {
    id: 'q4',
    title: 'Tiết kiệm 100k đầu tiên',
    desc: 'Dành tiền mua trang bị thực tế thay vì đốt khói.',
    exp: 30000,
    hp: 10,
    completed: false,
    claimed: false,
    icon: 'savings'
  },
  {
    id: 'q5',
    title: 'Vượt ải Boss Cuối Tuần (Chủ Nhật 0 điếu)',
    desc: 'Khắc chế tiệc tùng cuối tuần mà không hút điếu nào.',
    exp: 50000,
    hp: 20,
    completed: false,
    claimed: false,
    icon: 'military_tech'
  }
];
