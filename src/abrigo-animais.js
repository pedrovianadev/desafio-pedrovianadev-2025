class AbrigoAnimais {

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    // Definindo os dados dos animais
    const animais = {
      'Rex': { tipo: 'cão', brinquedos: ['RATO', 'BOLA'] },
      'Mimi': { tipo: 'gato', brinquedos: ['BOLA', 'LASER'] },
      'Fofo': { tipo: 'gato', brinquedos: ['BOLA', 'RATO', 'LASER'] },
      'Zero': { tipo: 'gato', brinquedos: ['RATO', 'BOLA'] },
      'Bola': { tipo: 'cão', brinquedos: ['CAIXA', 'NOVELO'] },
      'Bebe': { tipo: 'cão', brinquedos: ['LASER', 'RATO', 'BOLA'] },
      'Loco': { tipo: 'jabuti', brinquedos: ['SKATE', 'RATO'] }
    };

    try {
      // Validação e parsing dos parâmetros de entrada
      const brinquedos1 = this.validarEParsearBrinquedos(brinquedosPessoa1, brinquedosValidos);
      const brinquedos2 = this.validarEParsearBrinquedos(brinquedosPessoa2, brinquedosValidos);
      const listaAnimais = this.validarEParsearAnimais(ordemAnimais, animais);

      // Processamento da lógica de adoção
      const resultado = this.processarAdocoes(listaAnimais, animais, brinquedos1, brinquedos2);
      
      return { lista: resultado };
    } catch (error) {
      return { erro: error.message };
    }

  }

  validarEParsearBrinquedos(brinquedosString, brinquedosValidos) {
    const brinquedos = brinquedosString.split(',').map(b => b.trim());
    
    // Verifica se há brinquedos duplicados
    const brinquedosUnicos = new Set(brinquedos);
    if (brinquedos.length !== brinquedosUnicos.size) {
      throw new Error('Brinquedo inválido');
    }

    // Verifica se todos os brinquedos são válidos
    for (const brinquedo of brinquedos) {
      if (!brinquedosValidos.includes(brinquedo)) {
        throw new Error('Brinquedo inválido');
      }
    }

    return brinquedos;
  }

  validarEParsearAnimais(animaisString, animais) {
    const listaAnimais = animaisString.split(',').map(a => a.trim());
    
    // Verificar se há animais duplicados
    const animaisUnicos = new Set(listaAnimais);
    if (listaAnimais.length !== animaisUnicos.size) {
      throw new Error('Animal inválido');
    }

    // Verificar se todos os animais são válidos
    for (const animal of listaAnimais) {
      if (!animais[animal]) {
        throw new Error('Animal inválido');
      }
    }

    return listaAnimais;
  }
}

export { AbrigoAnimais as AbrigoAnimais };
