import React from "react";
import { Box } from "./ResponsiveModal";

const SortDevice = () => {
  return (
    <div style={{ width: '100%' }}>
      <Box style={{ textAlign: 'left' }}>등록순</Box>
      <Box style={{ textAlign: 'left' }}>동작중</Box>
      <Box style={{ textAlign: 'left' }}>수돗물 수위</Box>
      <Box style={{ textAlign: 'left' }}>살충제 수위</Box>
      <Box style={{ textAlign: 'left' }}>살균소독 모드</Box>
      <Box style={{ textAlign: 'left' }}>해충 방제 모드</Box>
      {/* <Box>수위 낮음</Box> */}
      {/*<Box>약품 없음</Box>*/}
      {/* <Box>필터 교체</Box> */}
      {/*<Box>공간 제균 모드</Box>*/}
      {/*<Box>해충 방제 모드</Box>*/}
      {/* <Box>바이오에어로졸 지수</Box> */}
      {/* <Box>공기질 지수</Box> */}
      {/* <Box>미세먼지 지수</Box> */}
    </div>
  );
};

export default SortDevice;
