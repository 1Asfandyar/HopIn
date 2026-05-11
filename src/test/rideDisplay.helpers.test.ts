import { describe, expect, it } from '@jest/globals';
import { getShortRideAddress } from '@/features/rides/helpers/rideDisplay.helpers';

describe('ride display helpers', () => {
  it('shows the last two address parts for long addresses', () => {
    expect(
      getShortRideAddress(
        'photon pedal, department of telecommunication, university of engineering and technology, taxila',
      ),
    ).toBe('university of engineering and technology, taxila');
  });

  it('keeps short addresses unchanged', () => {
    expect(getShortRideAddress('UET Taxila')).toBe('UET Taxila');
    expect(getShortRideAddress('University Road, Taxila')).toBe(
      'University Road, Taxila',
    );
  });
});
