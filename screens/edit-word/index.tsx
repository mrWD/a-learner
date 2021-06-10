import * as React from 'react';
import { StyleSheet, ScrollView, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { View } from '../../components/Themed';
import { Button } from '../../components/button';
import { TextInput } from '../../components/text-input';
import { InlineElements } from '../../components/inline-elements';
import { Checkbox } from '../../components/checkbox';
import { Title } from '../../components/title';
import { RecordInput } from '../../components/record-input';
import { CheckList } from '../../components/checklist';
import { Icon } from '../../components/icon';

import { EMPTY_FIELDS_ERROR, EMPTY_FIELDS_ERROR_TIP } from '../../constants/ErrorMessages';
import { MAX_TEXT_LENGTH } from '../../constants/Limits';

import { useStore } from '../../store';

import { setMobInterstitial } from '../../utils/ads';
import { getLocalizedText } from '../../utils/localizedText';

import { RootStackParamList } from '../../types';

type Props = React.FC<StackScreenProps<RootStackParamList, 'EditWord'>>;

interface Form {
  name: string;
  fAudio: string;
  tAudio: string;
  description: string;
  contained: string[];
}

interface ChangedAudio {
  fAudio: string;
  tAudio: string;
}

const REQUIRED_FIELDS: Array<keyof Form> = ['name', 'fAudio', 'tAudio'];

const defaultForm: Form = {
  name: '',
  fAudio: '',
  tAudio: '',
  description: '',
  contained: [],
};

const defaultChangedAudio: ChangedAudio = {
  fAudio: '',
  tAudio: '',
};

const checkValidation = (form: Form, requiredList: Array<keyof Form>) => {
  const isValid = requiredList.every((value) => form[value].length);

  if (!isValid) {
    Alert.alert(EMPTY_FIELDS_ERROR, EMPTY_FIELDS_ERROR_TIP);
  }

  return isValid;
};

export const EditWord: Props = ({ navigation, route }) => {
  const [form, setForm] = React.useState(defaultForm);
  const [durations, setDurations] = React.useState({ tAudio: 0, fAudio: 0 });
  const [changedAudio, setChangedAudio] = React.useState(defaultChangedAudio);
  const [addOneMore, setAddOneMore] = React.useState(false);
  const [title, setTitle] = React.useState(getLocalizedText('New Word'));

  const store = useStore();

  setMobInterstitial();

  const saveChanges = () => {
    const duration = durations.tAudio + durations.fAudio;

    if (!route.params?.id) {
      store.addWord({ ...form, duration });
    } else {
      store.updateWord({ ...form, duration, id: route.params.id });
    }
  };

  const cleanAudioHistory = (innerForm: ChangedAudio) => {
    if (form.fAudio !== changedAudio.fAudio) {
      store.removeAudios(innerForm.fAudio);
    }

    if (form.tAudio !== changedAudio.tAudio) {
      store.removeAudios(innerForm.tAudio);
    }

    setChangedAudio(defaultChangedAudio);
    setForm({ ...defaultForm, contained: form.contained });
  };

  const handleGetDuration = (prop: 'tAudio' | 'fAudio') => (duration: number) => {
    setDurations((oldDurations) => ({ ...oldDurations, [prop]: duration }));
  };

  const handleFormChange = (prop: keyof Form) => (value: any) => {
    const audioValue = changedAudio[prop as keyof ChangedAudio];

    if (audioValue && form[prop] !== audioValue) {
      store.removeAudios(form[prop] as string);
    }

    setForm({ ...form, [prop]: value });
  };

  const handleCancelPress = () => {
    cleanAudioHistory(form);
    navigation.goBack();
  };

  const handleSavePress = () => {
    if (!checkValidation(form, REQUIRED_FIELDS)) {
      return;
    }

    saveChanges();
    cleanAudioHistory(changedAudio);

    if (!addOneMore) {
      navigation.goBack();
    }
  };

  React.useEffect(() => {
    const { id, listId } = route.params || {};

    if (listId) {
      setForm({ ...form, contained: [listId] });
    }

    const currentWord = store.wordList.find((item) => item.id === id);

    if (currentWord) {
      setTitle(getLocalizedText('Edit Word'));
      setForm(currentWord);
      setChangedAudio({ tAudio: currentWord.tAudio, fAudio: currentWord.fAudio });
    }
  }, [route]);

  return (
    <View style={styles.container}>
      <Title title={title} />

      <ScrollView style={styles.form}>
        <TextInput
          style={styles.bottomIndent}
          label={getLocalizedText('Name')}
          value={form.name}
          required={REQUIRED_FIELDS.includes('name')}
          onInput={handleFormChange('name')}
        />

        <RecordInput
          style={styles.bottomIndent}
          label={getLocalizedText('Foreign Audio')}
          value={form.fAudio}
          required={REQUIRED_FIELDS.includes('fAudio')}
          onRecord={handleFormChange('fAudio')}
          onGetDuration={handleGetDuration('fAudio')}
        />

        <RecordInput
          style={styles.bottomIndent}
          label={getLocalizedText('Translation')}
          value={form.tAudio}
          required={REQUIRED_FIELDS.includes('tAudio')}
          onRecord={handleFormChange('tAudio')}
          onGetDuration={handleGetDuration('tAudio')}
        />

        <TextInput
          style={styles.bottomIndent}
          label={getLocalizedText('Description')}
          value={form.description}
          maxLength={MAX_TEXT_LENGTH}
          numberOfLines={4}
          multiline
          onInput={handleFormChange('description')}
        />

        {store.allLists[0] && (
          <CheckList
            style={styles.bottomIndent}
            label={getLocalizedText('Contained Lists')}
            items={store.allLists}
            value={form.contained}
            required={REQUIRED_FIELDS.includes('contained')}
            onChange={handleFormChange('contained')}
          />
        )}

        {!route.params?.id && (
          <Checkbox
            label={getLocalizedText('Add one more')}
            value={addOneMore}
            onChange={setAddOneMore}
          />
        )}
      </ScrollView>

      <InlineElements>
        <Button style={styles.halfWidth} type="danger" onPress={handleCancelPress}>
          <Icon style={styles.icon} icon="Close" />
        </Button>

        <Button style={styles.halfWidth} type="success" onPress={handleSavePress}>
          <Icon style={styles.icon} icon="Check" />
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
  halfWidth: {
    width: '50%',
  },
});
