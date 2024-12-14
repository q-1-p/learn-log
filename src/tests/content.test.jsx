import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Content from '../components/content';
import { findAll, deleteRecord } from '../infrastructure/repo';

// Mock the repository functions
jest.mock('../infrastructure/repo', () => ({
  findAll: jest.fn(),
  deleteRecord: jest.fn(),
  save: jest.fn(),
}));

describe('Content Component', () => {
  const mockRecords = [
    { id: 1, title: 'React学習', time: 2 },
    { id: 2, title: 'Jest学習', time: 3 },
  ];

  beforeEach(() => {
    // Setup initial mock data
    findAll.mockResolvedValue(mockRecords);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('削除ボタンをクリックすると、記録が削除される', async () => {
    // Setup
    deleteRecord.mockResolvedValue();
    findAll
      .mockResolvedValueOnce(mockRecords) // Initial load
      .mockResolvedValueOnce(mockRecords.filter(r => r.id !== 1)); // After deletion

    // Render component
    render(<Content />);

    // Wait for initial records to load
    await waitFor(() => {
      expect(screen.getByText('React学習 2時間')).toBeInTheDocument();
    });

    // Find and click delete button for the first record
    const deleteButtons = screen.getAllByText('削除');
    fireEvent.click(deleteButtons[0]);

    // Verify deleteRecord was called with correct ID
    expect(deleteRecord).toHaveBeenCalledWith(1);

    // Verify the record is removed from the display
    await waitFor(() => {
      expect(screen.queryByText('React学習 2時間')).not.toBeInTheDocument();
    });
  });

  test('入力なしで登録ボタンを押すとエラーが表示される', async () => {
    // コンポーネントをレンダリング
    render(<Content />);

    // 初期データの読み込みを待つ
    await waitFor(() => {
      expect(screen.getByText('登録')).toBeInTheDocument();
    });

    // 登録ボタンを見つけてクリック（入力なしの状態で）
    const registerButton = screen.getByText('登録');
    fireEvent.click(registerButton);

    // エラーメッセージが表示されることを確認
    expect(screen.getByText('入力されていない項目があります')).toBeInTheDocument();
  });
});
