import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Package } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password) {
      toast({
        title: 'خطا',
        description: 'لطفا تمام فیلدها را پر کنید',
        variant: 'destructive',
      });
      return;
    }

    login(email, password, name);
    toast({
      title: 'ورود موفق',
      description: 'به FastFactor خوش آمدید',
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Package className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">FastFactor</h1>
          <p className="text-muted-foreground text-center">
            ثبت‌نام / ورود به پنل فروشندگان
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">نام و نام خانوادگی</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="نام خود را وارد کنید"
              className="text-right"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">ایمیل</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="text-right"
              dir="ltr"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">رمز عبور</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="رمز عبور"
              className="text-right"
            />
          </div>

          <Button type="submit" className="w-full">
            ورود / ثبت‌نام
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
