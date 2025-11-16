import { useState, useEffect, useCallback } from 'react';

// NOTA: Este arquivo contém implementação personalizada que foi usada com wouter
// Atualmente está OBSOLETO pois migramos para react-router-dom
// Mantido apenas para referência e compatibilidade com código legado
// Usa o hash do URL (#/rota) em vez do pathname normal
export const useHashLocation = () => {
  // Função para extrair a rota do hash, removendo o # inicial
  const getHashPath = () => {
    // Remover o # inicial e garantir que há uma / no início
    let hash = window.location.hash.replace(/^#/, '') || '/';
    if (!hash.startsWith('/')) {
      hash = '/' + hash;
    }
    return hash;
  };

  const [location, setLocation] = useState(getHashPath());

  // Manipulador para atualizar o estado quando o hash muda
  const handleHashChange = useCallback(() => {
    setLocation(getHashPath());
  }, []);

  // Função para navegar para outra rota
  const navigate = useCallback((to: string) => {
    // Atualizar o hash da URL (o que dispara o evento hashchange)
    window.location.hash = to;
  }, []);

  // Registrar e limpar o listener de evento
  useEffect(() => {
    window.addEventListener('hashchange', handleHashChange);
    
    // Se a página carregou sem hash, definir o hash inicial como /
    if (!window.location.hash) {
      window.location.hash = '/';
    }
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [handleHashChange]);

  return [location, navigate];
};

// Hook personalizado que sempre usa hash routing para maior compatibilidade
export const useHybridLocation = () => {
  // Forçar hash routing para todos os ambientes (dev e prod)
  // Este é o método mais compatível com todos os ambientes de hospedagem
  
  // Função para extrair a rota do hash
  const getHashPath = () => {
    // Remover o # inicial e garantir que há uma / no início
    let hash = window.location.hash.replace(/^#/, '') || '/';
    if (!hash.startsWith('/')) {
      hash = '/' + hash;
    }
    return hash;
  };
  
  // Estado para armazenar a localização atual
  const [location, setLocation] = useState(getHashPath());
  
  // Função para navegar
  const navigate = useCallback((to: string) => {
    // Se a rota não começar com /, adicione
    if (!to.startsWith('/')) {
      to = '/' + to;
    }
    
    // Navegar usando hash
    window.location.hash = to;
  }, []);
  
  // Efeito para configurar os listeners adequados
  useEffect(() => {
    // Manipulador para atualizar o estado quando o hash muda
    const handleHashChange = () => {
      setLocation(getHashPath());
    };
    
    window.addEventListener('hashchange', handleHashChange);
    
    // Configuração inicial - garantir que existe um hash
    if (!window.location.hash) {
      window.location.hash = '/';
    } else {
      // Se já existe um hash, atualize o estado
      handleHashChange();
    }
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
  
  return [location, navigate] as const;
};