'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  Container,
  Paper,
} from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { AuthCredentials } from '../../core/entities/User';

interface LoginFormProps {
  onLoginSuccess?: () => void;
  onSwitchToSignUp?: () => void;
}

export function LoginForm({ onLoginSuccess, onSwitchToSignUp }: LoginFormProps) {
  const { signIn, loading, error, clearError } = useAuth();
  const [formData, setFormData] = useState<AuthCredentials>({
    email: '',
    password: '',
  });
  const [localError, setLocalError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setLocalError(null);
    clearError();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalError(null);

    try {
      await signIn(formData);
      setFormData({ email: '', password: '' });
      onLoginSuccess?.();
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : 'Erro ao fazer login');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 3 }}>
          Login
        </Typography>

        {(error || localError) && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error || localError}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            disabled={loading}
            autoComplete="email"
          />

          <TextField
            label="Senha"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
            disabled={loading}
            autoComplete="current-password"
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading || !formData.email || !formData.password}
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Entrar'}
          </Button>

          {onSwitchToSignUp && (
            <Typography align="center" sx={{ mt: 2 }}>
              Não tem conta?{' '}
              <Button
                color="primary"
                onClick={onSwitchToSignUp}
                disabled={loading}
                sx={{ textTransform: 'none' }}
              >
                Criar uma agora
              </Button>
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
}
