import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderHeuristicaComponent } from '../components/heuristica-component/header-heuristica';

@Component({
  selector: 'app-h3-page',
  imports: [CommonModule, FormsModule, HeaderHeuristicaComponent],
  templateUrl: './h3-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class H3Page {
  content = '';
  showModal = signal(false);
  saveProgress = signal(0);
  history = signal<string[]>(['']);
  currentIndex = signal(0);

  onTextChange() {
    const newHistory = this.history().slice(0, this.currentIndex() + 1);
    newHistory.push(this.content);
    this.history.set(newHistory);
    this.currentIndex.set(newHistory.length - 1);
  }

  canUndo(): boolean {
    return this.currentIndex() > 0;
  }

  canRedo(): boolean {
    return this.currentIndex() < this.history().length - 1;
  }

  undo() {
    if (this.canUndo()) {
      this.currentIndex.update(i => i - 1);
      this.content = this.history()[this.currentIndex()];
    }
  }

  redo() {
    if (this.canRedo()) {
      this.currentIndex.update(i => i + 1);
      this.content = this.history()[this.currentIndex()];
    }
  }

  saveText() {
    this.showModal.set(true);
    this.saveProgress.set(0);

    const interval = setInterval(() => {
      const progress = this.saveProgress();
      if (progress < 100) {
        this.saveProgress.set(Math.min(progress + 20, 100));
      } else {
        clearInterval(interval);
        setTimeout(() => this.closeModal(), 1000);
      }
    }, 500);
  }

  closeModal() {
    this.showModal.set(false);
    this.saveProgress.set(0);
  }

  cancelSave() {
    this.closeModal();
  }

  saveInBackground() {
    this.showModal.set(false);
    // Continúa guardando en segundo plano
  }

  clearText() {
    if (confirm('¿Estás seguro de que quieres limpiar todo el texto?')) {
      this.content = '';
      this.onTextChange();
    }
  }

  loadTemplate() {
    this.content = 'Plantilla de ejemplo:\n\n1. Introducción\n2. Desarrollo\n3. Conclusiones';
    this.onTextChange();
  }

  nombre = '';
  email = '';
  password = '';

  enviando = signal(false);
  registroExitoso = signal(false);
  mensaje = signal<{tipo: 'success' | 'error', texto: string} | null>(null);

  validaciones = signal({
    nombre: 'neutral' as 'valid' | 'invalid' | 'neutral',
    email: 'neutral' as 'valid' | 'invalid' | 'neutral',
    password: 'neutral' as 'valid' | 'invalid' | 'neutral'
  });

  passwordStrength = signal(0);

  validarNombre() {
    const valido = this.nombre.length >= 3;
    this.validaciones.update(v => ({...v, nombre: valido ? 'valid' : 'invalid'}));
  }

  validarEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valido = emailRegex.test(this.email);
    this.validaciones.update(v => ({...v, email: valido ? 'valid' : 'invalid'}));
  }

  validarPassword() {
    let strength = 0;
    if (this.password.length >= 8) strength++;
    if (/[A-Z]/.test(this.password)) strength++;
    if (/[0-9]/.test(this.password)) strength++;
    if (/[^A-Za-z0-9]/.test(this.password)) strength++;

    this.passwordStrength.set(strength);
    const valido = strength >= 3;
    this.validaciones.update(v => ({...v, password: valido ? 'valid' : 'invalid'}));
  }

  calcularProgreso(): number {
    const validCount = Object.values(this.validaciones()).filter(v => v === 'valid').length;
    return Math.round((validCount / 3) * 100);
  }

  formularioValido(): boolean {
    return Object.values(this.validaciones()).every(v => v === 'valid');
  }

  getInputClass(campo: keyof ReturnType<typeof this.validaciones>): string {
  const estado = this.validaciones()[campo];
  const baseClass = 'focus:outline-none focus:ring-2';

  switch (estado) {
    case 'valid':
      return `${baseClass} border-green-500 focus:border-green-500 focus:ring-green-200`;
    case 'invalid':
      return `${baseClass} border-red-500 focus:border-red-500 focus:ring-red-200`;
    default:
      return `${baseClass} border-gray-300 focus:border-blue-500 focus:ring-blue-200`;
  }
}

  getPasswordStrengthClass(nivel: number): string {
    if (nivel <= this.passwordStrength()) {
      switch (this.passwordStrength()) {
        case 1: return 'bg-red-400';
        case 2: return 'bg-orange-400';
        case 3: return 'bg-yellow-400';
        case 4: return 'bg-green-400';
        default: return 'bg-gray-200';
      }
    }
    return 'bg-gray-200';
  }

  getPasswordStrengthText(): string {
    switch (this.passwordStrength()) {
      case 1: return '🔴 Débil - Agrega mayúsculas y números';
      case 2: return '🟠 Regular - Incluye símbolos especiales';
      case 3: return '🟡 Buena - Muy bien, es segura';
      case 4: return '🟢 Excelente - Contraseña muy segura';
      default: return 'Mínimo 8 caracteres';
    }
  }

  getPasswordTextClass(): string {
    switch (this.passwordStrength()) {
      case 1: return 'text-red-500';
      case 2: return 'text-orange-500';
      case 3: return 'text-yellow-600';
      case 4: return 'text-green-500';
      default: return 'text-gray-500';
    }
  }

  getButtonClass(): string {
    if (this.enviando()) {
      return 'bg-blue-400 cursor-not-allowed text-white';
    } else if (this.registroExitoso()) {
      return 'bg-green-500 text-white';
    } else if (this.formularioValido()) {
      return 'bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-105';
    } else {
      return 'bg-gray-300 cursor-not-allowed text-gray-500';
    }
  }

  getMensajeClass(): string {
    const tipo = this.mensaje()?.tipo;
    return tipo === 'success'
      ? 'bg-green-50 border border-green-200 text-green-800'
      : 'bg-red-50 border border-red-200 text-red-800';
  }

  onSubmit() {
    if (!this.formularioValido() || this.enviando()) return;

    this.enviando.set(true);
    this.mensaje.set(null);

    // Simula proceso de registro
    setTimeout(() => {
      this.enviando.set(false);
      this.registroExitoso.set(true);
      this.mensaje.set({
        tipo: 'success',
        texto: '¡Cuenta creada exitosamente! Revisa tu email para confirmar.'
      });
    }, 2000);
  }
}
