import { Text } from 'react-native';
import { ThemedTextProps } from '../types';
import { fontFamilies } from '../tokens';

const ThemedText = ({
  weight = 'regular',
  style,
  ...props
}: ThemedTextProps) => {
  return (
    <Text
      {...props}
      style={[
        {
          fontFamily: fontFamilies[weight],
        },
        style,
      ]}
    />
  );
};

export default ThemedText;
