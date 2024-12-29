import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

interface CheckListItem {
  id: number;
  text: string;
  completed: boolean;
  amount?: number;
}

interface CheckListProps {
  transactions: any[];
}

export function CheckList({ transactions }: CheckListProps) {
  const [items, setItems] = useState<CheckListItem[]>([]);

  useEffect(() => {
    // Criar itens do checklist baseados nas transações
    const expenseTransactions = transactions.filter(t => t.type === 'expense');
    const newItems = expenseTransactions.map((transaction, index) => ({
      id: index + 1,
      text: transaction.description,
      completed: false,
      amount: transaction.amount
    }));
    setItems(newItems);
  }, [transactions]);

  const toggleItem = (id: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Lista de Verificação de Saídas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`item-${item.id}`}
                  checked={item.completed}
                  onCheckedChange={() => toggleItem(item.id)}
                />
                <Label
                  htmlFor={`item-${item.id}`}
                  className={`text-sm ${item.completed ? 'line-through text-gray-500' : ''}`}
                >
                  {item.text}
                </Label>
              </div>
              <span className={`text-sm font-medium ${item.completed ? 'text-gray-500' : 'text-red-600'}`}>
                R$ {item.amount?.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
