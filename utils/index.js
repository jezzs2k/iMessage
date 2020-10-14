import {PixelRatio, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

/*responsive width screen(percentage) from dp to px*/
export const widthPercentageToDP = (widthPercent) => {
  const elemWidth =
    typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);
  return PixelRatio.getFontScale() >= 1
    ? PixelRatio.roundToNearestPixel((width * elemWidth) / 100)
    : Math.round(
        ((width * elemWidth) / 100) * Math.round(PixelRatio.getFontScale()),
      );
};
/*responsive height screen(percentage) from dp to px*/
export const heightPercentageToDP = (heightPercent) => {
  const elemHeight =
    typeof heightPercent === 'number'
      ? heightPercent
      : parseFloat(heightPercent);
  return PixelRatio.getFontScale() >= 1
    ? PixelRatio.roundToNearestPixel((height * elemHeight) / 100)
    : Math.round(
        ((height * elemHeight) / 100) * Math.round(PixelRatio.getFontScale()),
      );
};

/*case change Font Setting from dp to px*/
export const responsiveFontWidth = (widthPercent) => {
  const elemWidth =
    typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);
  return (
    PixelRatio.roundToNearestPixel((width * elemWidth) / 100) /
    PixelRatio.getFontScale()
  );
};

/*case change Font Setting from dp to px*/
export const responsiveFontSetting = (heightPercent) => {
  const elemHeight =
    typeof heightPercent === 'number'
      ? heightPercent
      : parseFloat(heightPercent);
  return (
    PixelRatio.roundToNearestPixel((height * elemHeight) / 100) /
    PixelRatio.getFontScale()
  );
};

export const resetFontSizeInput = (size) => {
  return size ? Number(size) / PixelRatio.getFontScale() : undefined;
};

const percentageCalculation = (max, val) =>
  (max * (val / 100)) / PixelRatio.getFontScale();

const fontCalculation = (fontHeight, fontWidth, val) => {
  const widthDimension = fontHeight > fontWidth ? fontWidth : fontHeight;
  const aspectRatioBasedHeight = (16 / 9) * widthDimension;
  return percentageCalculation(
    Math.sqrt(
      Math.pow(aspectRatioBasedHeight, 2) + Math.pow(widthDimension, 2),
    ),
    val,
  );
};

export const responsiveFontSize = (f) => {
  return fontCalculation(height, width, f);
};

export const removeAccents = (str) => {
  if (!str) {
    return '';
  }

  var AccentsMap = [
    'aàảãáạăằẳẵắặâầẩẫấậ',
    'AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ',
    'dđ',
    'DĐ',
    'eèẻẽéẹêềểễếệ',
    'EÈẺẼÉẸÊỀỂỄẾỆ',
    'iìỉĩíị',
    'IÌỈĨÍỊ',
    'oòỏõóọôồổỗốộơờởỡớợ',
    'OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ',
    'uùủũúụưừửữứự',
    'UÙỦŨÚỤƯỪỬỮỨỰ',
    'yỳỷỹýỵ',
    'YỲỶỸÝỴ',
  ];
  for (var i = 0; i < AccentsMap.length; i++) {
    var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
    var char = AccentsMap[i][0];
    str = str.replace(re, char);
  }
  return str;
};

export function isEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
