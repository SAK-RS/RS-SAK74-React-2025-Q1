import { type FC, memo } from 'react';
import type { Country } from 'types';

type RegionSelectProps = {
  regions: Country['region'][];
  selectedRegion?: Country['region'];
  onRegionChange: (region: Country['region']) => void;
};

const RegionSelect: FC<RegionSelectProps> = ({
  regions,
  onRegionChange,
  selectedRegion,
}) => {
  return (
    <label>
      Filter by:
      <select
        value={selectedRegion}
        onChange={({ target: { value } }) => {
          onRegionChange(value);
        }}
      >
        <option value={undefined}></option>
        {regions.map((region) => (
          <option key={region}>{region}</option>
        ))}
      </select>
    </label>
  );
};

export default memo(RegionSelect);
