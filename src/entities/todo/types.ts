export type Todo = {
  id: string;
  title: string;
  created_at: string;
  description: string | null;
  is_completed: boolean;
  completed_at: string | null;
  user_id: string;
};
