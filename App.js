/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import dayjs from 'dayjs';

import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

import {read, write} from './src/storage'

const App: () => React$Node = () => {  
  const [menstruationDays, setMenstruationDays] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  // load all data once initially
  useEffect(() => {
    if (!isLoaded) {
      read().then(data => {
        setMenstruationDays(data);
        setIsLoaded(true);
      })
    }
  }, [isLoaded]);

  // persist data after (but skip if it was never loaded before)
  useEffect(() => {
    if (isLoaded) {
      write(menstruationDays)
    }
  }, [menstruationDays]);


  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.main}>
          <View style={styles.calendar}>
            <CalendarList
              firstDay={1}
              onDayPress={day => {
                if (menstruationDays[day.dateString]) {
                  delete menstruationDays[day.dateString]
                } else {
                  menstruationDays[day.dateString] = {color: 'darkred'}
                }
                setMenstruationDays(Object.assign({}, menstruationDays))
              }}
              // Max amount of months allowed to scroll to the past. Default = 50
              pastScrollRange={50}
              // Max amount of months allowed to scroll to the future. Default = 50
              futureScrollRange={50}
              // Enable or disable scrolling of calendar list
              scrollEnabled={true}
              // Enable or disable vertical scroll indicator. Default = false
              showScrollIndicator={true}
              current={dayjs().format('YYYY-MM-DD')}
              // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
              minDate={dayjs().add(1, 'week').format('YYYY-MM-DD')}
              markedDates={menstruationDays}
              // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
              markingType={'period'}
            />
          </View>
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Mark your stuff..
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'column',
  },
  calendar: {
    backgroundColor: Colors.white,
    flexBasis: 500,
    flex: 3,
  },
  footer: {
    flex: 1,
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
  },
  footerText: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
    color: Colors.black,
  },
});

export default App;
