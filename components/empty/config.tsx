import React from 'react';
import {
  NoApp,
  NoData,
  NoLog,
  NoRecords,
  NoResults,
  NoRatings,
  NoImage,
  NoPremission,
} from './otherImageType';

const noAppImg = <NoApp />;
const noData = <NoData />;
const noLog = <NoLog />;
const noRecords = <NoRecords />;
const noResults = <NoResults />;
const noRatings = <NoRatings />;
const noImage = <NoImage />;
const noPremission = <NoPremission />;

type ImageType =
  | 'NO_APP'
  | 'NO_DATA'
  | 'NO_LOG'
  | 'NO_RECORDS'
  | 'NO_RESULTS'
  | 'NO_RATINGS'
  | 'NO_IMAGE'
  | 'NO_PREMISSION';

const typeConfig = new Map([
  ['NO_APP', { icon: noAppImg, description: 'No Application Found' }],
  ['NO_DATA', { icon: noData, description: 'No Data' }],
  ['NO_LOG', { icon: noLog, description: 'No Logs Found' }],
  ['NO_RECORDS', { icon: noRecords, description: 'No Operation Records' }],
  ['NO_RESULTS', { icon: noResults, description: 'Your search does not match any results' }],
  ['NO_RATINGS', { icon: noRatings, description: 'You hava not received any ratings' }],
  ['NO_IMAGE', { icon: noImage, description: 'No Image Found' }],
  ['NO_PREMISSION', { icon: noPremission, description: 'No Premission' }],
]);

export { ImageType, typeConfig };
