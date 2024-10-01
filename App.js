import React, { useState, useRef } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Cronometro = () => {

  // estado do cronômetro (true é rodando, false é não rodando)
  const [estado, setEstado] = useState(false)
  const [tempo, setTempo] = useState(0) // tempo em milissegundos
  const intervalRef = useRef(null);  // Intervalo do cronômetro


  function inicializarCronometro () {
    if (!estado) {
      setEstado(true)
      intervalRef.current = setInterval(() => {
        setTempo(prevTime => prevTime + 10)
      }, 10)
    }
  }

  function pausarTimer () {
    if (estado) {
      clearInterval(intervalRef.current)
      setEstado(false)
    }
  }

  function resetarTimer () {
    clearInterval(intervalRef.current);
    setEstado(false);
    setTempo(0);
  }


  function formatarTempo () {
    const minutes = Math.floor(tempo / 60000);
    const seconds = Math.floor((tempo % 60000) / 1000);
    const milliseconds = Math.floor((tempo % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')},${milliseconds.toString().padStart(2, '0')}`
  }

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{formatarTempo()}</Text>
      <Button title={estado ? 'Pausar' : 'Iniciar'} onPress={estado ? pausarTimer : inicializarCronometro} />
      <Button title="Resetar" onPress={resetarTimer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  timerText: {
    fontSize: 72,
    fontWeight: 'semibold',
    marginBottom: 20,
  },
});

export default Cronometro;
