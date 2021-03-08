import * as React from 'react';
import { StyleSheet, ScrollView, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { View } from '../../components/Themed';
import { Button } from '../../components/button';
import { TextInput } from '../../components/text-input';
import { InlineElements } from '../../components/inline-elements';
import { Checkbox } from '../../components/checkbox';
import { Title } from '../../components/title';

import { Icons } from '../../constants/Icons';
import { EMPTY_FIELDS_ERROR, EMPTY_FIELDS_ERROR_TIP } from '../../constants/ErrorMessages';
import { MAX_TEXT_LENGTH } from '../../constants/Limits';

import { useStore } from '../../store';

import { RootStackParamList } from '../../types';

type Props = React.FC<StackScreenProps<RootStackParamList, 'EditList'>>;

const DEFAULT_TITLE = 'New List';

export const EditList: Props = ({ navigation, route }) => {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [addOneMore, setAddOneMore] = React.useState(false);
  const [title, setTitle] = React.useState(DEFAULT_TITLE);

  const store = useStore();

  React.useEffect(() => {
    if (route.params?.id) {
      const currentWord = store.allLists.find((item) => item.id === route.params?.id);

      setTitle(currentWord?.name || DEFAULT_TITLE);
      setName(currentWord?.name || '');
      setDescription(currentWord?.description || '');
    }
  }, [route.params?.id]);


  const handleSavePress = () => {
    if (!name) {
      Alert.alert(EMPTY_FIELDS_ERROR, EMPTY_FIELDS_ERROR_TIP);
      return;
    }

    if (!route.params?.id) {
      store.addList({ name, description });
    } else {
      store.updateList({ name, description, id: route.params.id });
    }

    setName('');

    if (!addOneMore) {
      navigation.goBack();
    }
  };

  const handleCancelPress = () => {
    navigation.navigate('Root');
  };

  return (
    <View style={styles.container}>
      <Title title={title} />

      <ScrollView style={styles.form}>
        <TextInput
          style={styles.bottomIndent}
          label="Name"
          value={name}
          required
          onInput={setName}
        />

        <TextInput
          style={styles.bottomIndent}
          label="Description"
          value={description}
          maxLength={MAX_TEXT_LENGTH}
          numberOfLines={4}
          multiline
          onInput={setDescription}
        />

        <Checkbox label="Add one more" value={addOneMore} onChange={setAddOneMore} />
      </ScrollView>

      <InlineElements>
        <Button style={styles.halfWidth} type="danger" onPress={handleCancelPress}>
          <Icons.Close style={styles.icon} />
        </Button>

        <Button style={styles.halfWidth} type="success" onPress={handleSavePress}>
          <Icons.Check style={styles.icon} />
        </Button>
      </InlineElements>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    overflow: 'scroll',
    flex: 1,
    width: '100%',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  icon: {
    width: 38,
    height: 38,
    color: '#222222',
  },
  bottomIndent: {
    marginBottom: 16,
  },
  bottomLastIndent: {
    marginBottom: 40,
  },
  halfWidth: {
    width: '50%',
  },
});
