import axios from 'axios';
import { IAppState } from '../models/app-state.model.ts';
import { IAppConfig } from '../models/config.model.ts';

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD
    ? 'https://photobooth-masonry-be.vercel.app/api/smoke'
    : 'http://localhost:4000/api/smoke');

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

export class ApiService {
  /**
   * Lấy toàn bộ trạng thái người dùng từ MongoDB
   */
  public static async getState(): Promise<IAppState> {
    const response = await apiClient.get<IAppState>('/state');
    return response.data;
  }

  /**
   * Ghi nhận 1 lần hút thuốc (Lên cơn vừa hút / Tái phát)
   */
  public static async recordSmoke(reason: string = 'STRESS'): Promise<IAppState> {
    const response = await apiClient.post<IAppState>('/record', { reason });
    return response.data;
  }

  /**
   * Ghi nhận vượt qua cơn thèm (Hoàn thành bài thở SOS 3 phút)
   */
  public static async recordCravingResisted(): Promise<IAppState> {
    const response = await apiClient.post<IAppState>('/craving-resisted');
    return response.data;
  }

  /**
   * Nhận thưởng nhiệm vụ
   */
  public static async claimQuest(questId: string): Promise<IAppState> {
    const response = await apiClient.post<IAppState>(`/quests/${questId}/claim`);
    return response.data;
  }

  /**
   * Cập nhật cài đặt cấu hình người dùng
   */
  public static async updateConfig(config: Partial<IAppConfig>): Promise<IAppConfig> {
    const response = await apiClient.put<IAppConfig>('/config', config);
    return response.data;
  }

  /**
   * Reset toàn bộ dữ liệu về trạng thái ban đầu
   */
  public static async resetState(): Promise<IAppState> {
    const response = await apiClient.post<IAppState>('/reset');
    return response.data;
  }
}
