import {useEffect, useState} from 'react';
import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {client, IDriver} from 'shared/api';
import {RootStackScreenProps} from 'shared/types';

type Props = RootStackScreenProps<'Driver'>;

type DriverResponceType = {
  MRData: {
    xmlns: string;
    series: string;
    url: string;
    limit: string;
    offset: string;
    total: string;
    DriverTable: {
      driverId: string;
      Drivers: IDriver[];
    };
  };
};

export const DriverScreen = ({route}: Props) => {
  const {id} = route.params;
  const [driver, setDriver] = useState<IDriver | null>(null);

  useEffect(() => {
    (async () => {
      const res: DriverResponceType = (await client.get(`drivers/${id}/`)).data;
      const [driverRes, ...[]] = res.MRData.DriverTable.Drivers;
      if (driverRes) {
        setDriver(driverRes);
      }
    })();
  }, [id]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Имя:{'\t'}
        <Text style={styles.text}>
          {driver?.familyName} {driver?.givenName}
        </Text>
      </Text>
      <Text style={styles.title}>
        Дата рожления:{'\t'}
        <Text style={styles.text}>
          {new Date(driver?.dateOfBirth ?? '').toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </Text>
      </Text>
      <Text style={styles.title}>
        Страна:{'\t'}
        <Text style={styles.text}>{driver?.nationality}</Text>
      </Text>
      <TouchableOpacity
        style={styles.button}
        disabled={!driver?.url}
        onPress={() => driver?.url && Linking.openURL(driver.url)}>
        <Text style={styles.buttonText}>Информация</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  button: {
    height: 60,
    borderRadius: 20,
    marginTop: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3b3bd3',
  },
  title: {
    fontSize: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
  },
});
