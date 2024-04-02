import { StyleSheet, Text, View, StatusBar, Button } from "react-native";
import { useState, useEffect } from "react";

// expo-notifications
import * as Notifications from "expo-notifications";

// Manipulando o evento de notificação
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    };
  },
});

export default function App() {
  // State da notificação
  const [dados, setDados] = useState(null);

  // Effect de permissões
  useEffect(() => {
    // Função de permissão IOS
    async function permissoesIOS() {
      return await Notifications.requestPermissionsAsync({
        ios: {
          allowAlert: true,
          allowSound: true,
          allowBadge: true,
        },
      });
    }
    permissoesIOS();

    // Alert no topo do aplicativo
    Notifications.addNotificationReceivedListener((notificacao) => {
      console.log(notificacao);
    });

    // Interação do usuario com a notificação
    Notifications.addNotificationResponseReceivedListener((resposta) => {
      console.log(resposta);
    });
  }, []);

  // Função para enviar notificação local
  const enviarNotificacao = async () => {
    // Mensagem enviada
    const mensagem = {
      title: "Lembrete!",
      body: "Beba água 🥛",
    };

    // Função de agendamento de notificações
    await Notifications.scheduleNotificationAsync({
      content: mensagem,
      trigger: { seconds: 5 },
    });
  };

  return (
    <>
      <StatusBar />
      <View style={styles.container}>
        <Text>Recurso de Notificação Local</Text>
        <Button title="Disparar notificação" onPress={enviarNotificacao} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
