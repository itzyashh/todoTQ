import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';


type BottomSheetProps = {
    visible: boolean
    onDismiss: () => void
    onSave: (task: string) => any
};

const BottomSheet: React.FC<BottomSheetProps> = ({visible, onDismiss, onSave}) => {
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const [task, setTask] = React.useState('');

    // callbacks
    const onSavePress = () => {
        if (task === '') {
            onDismiss();
        }
        onSave(task);
    }

  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  useEffect(() => {
    if (visible){
        bottomSheetModalRef.current?.present();
    }
    else{
        bottomSheetModalRef.current?.dismiss();
    }
  }, [visible]);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);

    if (index === -1) {
      onDismiss();
    }

  }, []);

  // renders
  return (
    <BottomSheetModalProvider>

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <BottomSheetView style={styles.contentContainer}>
            <View style={styles.form}>
                <Text style={{fontSize: 24, color: '#000000', marginBottom: 20, alignSelf:'center'}}>Add Task</Text>
                <BottomSheetTextInput
                autoCorrect={false}
                onChangeText={setTask}
                autoCapitalize={'none'}
                 cursorColor={'#fb5b5a'}
                 style={styles.input} placeholder="Task" />

            </View>
            <TouchableOpacity onPress={onSavePress} style={styles.saveBtn}>
                <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </BottomSheetView>
        </BottomSheetModal>

    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
    form: {
        width: '80%',
        marginTop: 20,

    },
    input: {
        height: 60,
        width: '100%',
        borderWidth: 2,
        marginVertical: 10,
        padding: 10,
        paddingLeft: 20,
        borderRadius: 10,
        borderColor: '#fb5b5a',
        fontSize: 18,
        color: '#000000',
    },
    saveBtn: {
        backgroundColor: '#fb5b5a',
        width: '80%',
        height: 60,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    saveText: {
        color: '#ffffff',
        fontSize: 18,
    }
});

export default BottomSheet;