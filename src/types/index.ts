export type Iuser = {
  createdAt: string;
  userId: string;
  todos: Itodo[] ;
  id: string
}
export type Itodo = {
  id: number;
  value: string;
  checked: boolean;
}