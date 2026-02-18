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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useAuth } from '../hooks/useAuth';
import { SignUpData } from '../../core/entities/User';
import { validatePassword } from '../../core/utils/passwordValidator';

interface SignUpFormProps {
  onSignUpSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

export function SignUpForm({ onSignUpSuccess, onSwitchToLogin }: SignUpFormProps) {
  const { signUp, loading, error, clearError } = useAuth();
  const [formData, setFormData] = useState<SignUpData>({
    email: '',
    password: '',
    displayName: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);

  const passwordValidation = validatePassword(formData.password);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'confirmPassword') {
      setConfirmPassword(value);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    setLocalError(null);
    clearError();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalError(null);

    // Validações locais
    if (formData.password !== confirmPassword) {
      setLocalError('As senhas não conferem');
      return;
    }

    if (!passwordValidation.isValid) {
      setLocalError(
        `Senha fraca. Requisitos não atendidos: ${passwordValidation.errors.join(', ')}`
      );
      return;
    }

    try {
      await signUp(formData);
      setFormData({ email: '', password: '', displayName: '' });
      setConfirmPassword('');
      onSignUpSuccess?.();
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : 'Erro ao fazer cadastro');
    }
  };

  const requirements = [
    {
      label: 'Mínimo 8 caracteres',
      met: formData.password.length >= 8,
    },
    {
      label: 'Pelo menos 1 letra maiúscula',
      met: /[A-Z]/.test(formData.password),
    },
    {
      label: 'Pelo menos 1 letra minúscula',
      met: /[a-z]/.test(formData.password),
    },
    {
      label: 'Pelo menos 1 número',
      met: /[0-9]/.test(formData.password),
    },
    {
      label: 'Pelo menos 1 caractere especial',
      met: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password),
    },
  ];

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 3 }}>
          Criar Conta
        </Typography>

        {(error || localError) && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error || localError}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Nome Completo"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
            fullWidth
            required
            disabled={loading}
            autoComplete="name"
          />

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
            onFocus={() => setShowPasswordRequirements(true)}
            onBlur={() => setShowPasswordRequirements(false)}
            fullWidth
            required
            disabled={loading}
            autoComplete="new-password"
            error={formData.password.length > 0 && !passwordValidation.isValid}
            helperText={
              formData.password.length > 0 && !passwordValidation.isValid
                ? 'Senha não atende aos requisitos'
                : 'Clique no campo para ver os requisitos'
            }
          />

          {showPasswordRequirements && formData.password.length > 0 && (
            <Box
              sx={{
                p: 2,
                bgcolor: 'background.default',
                borderRadius: 1,
                border: '1px solid',
                borderColor: passwordValidation.isValid ? 'success.main' : 'error.main',
              }}
            >
              <Typography variant="caption" display="block" sx={{ mb: 1, fontWeight: 'bold' }}>
                Requisitos de Senha:
              </Typography>
              <List sx={{ p: 0 }}>
                {requirements.map((req, index) => (
                  <ListItem key={index} sx={{ py: 0.5, px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 24 }}>
                      {req.met ? (
                        <CheckCircleIcon sx={{ color: 'success.main', fontSize: '18px' }} />
                      ) : (
                        <CancelIcon sx={{ color: 'error.main', fontSize: '18px' }} />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={req.label}
                      primaryTypographyProps={{
                        variant: 'caption',
                        sx: { color: req.met ? 'success.main' : 'error.main' },
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          <TextField
            label="Confirmar Senha"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={handleChange}
            fullWidth
            required
            disabled={loading}
            autoComplete="new-password"
            error={confirmPassword.length > 0 && formData.password !== confirmPassword}
            helperText={
              confirmPassword.length > 0 && formData.password !== confirmPassword
                ? 'As senhas não conferem'
                : ''
            }
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={
              loading ||
              !formData.email ||
              !formData.password ||
              !formData.displayName ||
              !confirmPassword ||
              !passwordValidation.isValid ||
              formData.password !== confirmPassword
            }
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Criar Conta'}
          </Button>

          {onSwitchToLogin && (
            <Typography align="center" sx={{ mt: 2 }}>
              Já tem conta?{' '}
              <Button
                color="primary"
                onClick={onSwitchToLogin}
                disabled={loading}
                sx={{ textTransform: 'none' }}
              >
                Fazer login
              </Button>
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
}
