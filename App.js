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
import CalendarModel from './src/calendarModel'

const App: () => React$Node = () => {
  const [calendar, setCalendar] = useState(new CalendarModel());
  const [menstruationDays, setMenstruationDays] = useState({});
  const [menstruationStats, setMenstruationStats] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false);

  // load all data once initially
  useEffect(() => {
    if (!isLoaded) {
      read().then(data => {
        calendar.load(data);
        setMenstruationDays(Object.assign({}, calendar.getMenstruationDays()));
        setMenstruationStats(calendar.getIntervalStats());
        setIsLoaded(true);
      })
    }
  }, [isLoaded]);

  // persist data after (but skip if it was never loaded before)
  useEffect(() => {
    if (isLoaded) {
      write(calendar.dump())
      setMenstruationStats(calendar.getIntervalStats())
    }
  }, [menstruationDays]);

  let headerText;
  if (menstruationStats === null) {
    headerText = '';
  } else {
    headerText = `Last period was ${menstruationStats.whenWasLastInterval} days ago lasting ${menstruationStats.lengthOfLastInterval} days
Usually a period happens every ${menstruationStats.p90Interval} days lasting ${menstruationStats.p90Length} days`
  }
  
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.main}>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              {headerText}
            </Text>
          </View>
          <View style={styles.calendar}>
            <CalendarList
              firstDay={1}
              onDayPress={day => {
                if (menstruationDays[day.dateString]) {
                  calendar.remove(day.dateString);
                } else {
                  calendar.add(day.dateString);
                }
                setMenstruationDays(Object.assign({}, calendar.getMenstruationDays()))
              }}
              // Max amount of months allowed to scroll to the past. Default = 50
              pastScrollRange={24}
              // Max amount of months allowed to scroll to the future. Default = 50
              futureScrollRange={1}
              // Enable or disable scrolling of calendar list
              scrollEnabled={true}
              // Enable or disable vertical scroll indicator. Default = false
              showScrollIndicator={true}
              current={calendar.getToday()}
              markedDates={menstruationDays}
              // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
              markingType={'period'}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
  },
  calendar: {
    backgroundColor: Colors.white,
  },
  header: {
    height: 90,
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '300',
    padding: 4,
    paddingRight: 12,
    paddingTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray'
  },
  headerText: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '300',
    color: Colors.black,
  },
});

export default App;
