import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';
import Button from './ui/Button';
import Input from './ui/Input';
import Card, { CardContent, CardHeader } from './ui/Card';
import { LogIn, UserPlus, Mail, Lock } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface AuthCheckProps {
  children: React.ReactNode;
}

export default function AuthCheck({ children }: AuthCheckProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast.success('Connexion réussie !');
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        toast.success('Inscription réussie !');
      }
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de l\'authentification');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error('Erreur lors de la déconnexion');
    } else {
      toast.success('Déconnexion réussie');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-fantasy relative flex items-center justify-center">
        <div className="text-white text-xl">Chargement...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-fantasy relative flex items-center justify-center">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader>
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  {isLogin ? (
                    <LogIn className="w-8 h-8 text-red-400" />
                  ) : (
                    <UserPlus className="w-8 h-8 text-red-400" />
                  )}
                </div>
                <h2 className="text-2xl font-bold text-white">
                  {isLogin ? 'Connexion' : 'Inscription'}
                </h2>
                <p className="text-gray-400 mt-2">
                  {isLogin 
                    ? 'Connectez-vous pour créer vos personnages' 
                    : 'Créez un compte pour commencer'
                  }
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAuth} className="space-y-4">
                <div>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10"
                  />
                  <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
                <div className="relative">
                  <Input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10"
                  />
                  <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
                <Button
                  type="submit"
                  loading={submitting}
                  className="w-full"
                >
                  {isLogin ? 'Se connecter' : 'S\'inscrire'}
                </Button>
              </form>
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  {isLogin 
                    ? 'Pas encore de compte ? S\'inscrire' 
                    : 'Déjà un compte ? Se connecter'
                  }
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute top-4 right-4 z-10">
        <Button
          onClick={handleSignOut}
          variant="secondary"
          size="sm"
        >
          Déconnexion
        </Button>
      </div>
      {children}
    </div>
  );
}