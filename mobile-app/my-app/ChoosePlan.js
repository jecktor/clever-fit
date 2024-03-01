import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const ChoosePlan = ({navigation}) => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handlePress = (plan) => {
    setSelectedPlan(plan === selectedPlan ? null : plan);
  };

  const renderTextWithBullet = (text) => {
    return <Text>{text}</Text>; 
  };

  const renderCheckmark = (isSelected) => {
    return isSelected ? <Text>✅</Text> : null; 
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Choose your plan</Text>
      </View>
      <View style={styles.content}>
        <Pressable onPress={() => handlePress('Basic')}>
          <View style={[styles.box, selectedPlan === 'Basic' && styles.selectedBox]}>
          {renderCheckmark(selectedPlan === 'Basic')}
            <Text style={styles.boxTitle}>Basic plan</Text>
            {renderTextWithBullet('$20/month')}
            {renderTextWithBullet('• Acces to all gym facibilities.')}
          </View>
        </Pressable>
        <Pressable onPress={() => handlePress('Pro')}>
          <View style={[styles.box, selectedPlan === 'Pro' && styles.selectedBox]}>
          {renderCheckmark(selectedPlan === 'Pro')}
            <Text style={styles.boxTitle}>Pro plan</Text>
            {renderTextWithBullet('$25/month')}
            {renderTextWithBullet('• Acces to all gym facibilities')}
            {renderTextWithBullet('• Locker included')}
          </View>
        </Pressable>
      </View>
      <View style={styles.footer}>
        <Pressable style={styles.accessCodeButton}
            onPress={() => navigation.navigate('qr')}>
          <Text style={styles.accessCodeButtonText}>Access code</Text>
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  header: {
    marginTop: 70,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    marginBottom: 100,
  },
  box: {
    marginTop: 30,
    borderWidth: 1,
    padding: 60,
    borderColor: '#ddd', 
    borderRadius: 5,
    backgroundColor: '#fff', 
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, 
  },
  boxTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  boxText1: {
    marginTop: 10,
    textAlign: 'justify',
  },
  button: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#B5C0D0', 
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    width:380,
  },
  accessCodeButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: 'black', 
  },
  accessCodeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  boxText2: {
    marginTop: 10,
    textAlign: 'justify',
    fontWeight: 'bold',
  },
  selectedBox: {
    backgroundColor: '#e0e0e0', 
  },
 
});

export default ChoosePlan;
