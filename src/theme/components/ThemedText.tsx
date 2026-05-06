import { Text } from 'react-native';
import { ThemedTextProps } from '../types';
import { fontFamilies, fontSizes } from '../tokens';

const ThemedText = ({
  weight = 'regular',
  size = 'md',
  style,
  ...props
}: ThemedTextProps) => {
  return (
    <Text
      {...props}
      style={[
        {
          fontFamily: fontFamilies[weight],
          ...fontSizes[size],
        },
        style,
      ]}
    />
  );
};

export default ThemedText;
