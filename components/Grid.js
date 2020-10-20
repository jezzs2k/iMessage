import React from 'react';
import {Dimensions, FlatList, PixelRatio, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const Grid = ({
  renderItem,
  numColumns = 4,
  itemMargin = StyleSheet.hairlineWidth,
  ...props
}) => {
  const renderGridItem = (info) => {
    const {index} = info;
    const {width} = Dimensions.get('window');
    const size = PixelRatio.roundToNearestPixel(
      (width - itemMargin * (numColumns - 1)) / numColumns,
    );
    const marginLeft = index % numColumns === 0 ? 0 : itemMargin;
    const marginTop = index < numColumns ? 0 : itemMargin;

    return renderItem({...info, size, marginLeft, marginTop});
  };

  return (
    <FlatList {...props} renderItem={renderGridItem} numColumns={numColumns} />
  );
};

Grid.propTypes = {
  renderItem: PropTypes.func.isRequired,
  numColumns: PropTypes.number,
  itemMargin: PropTypes.number,
};

const styles = StyleSheet.create({});

export default Grid;
