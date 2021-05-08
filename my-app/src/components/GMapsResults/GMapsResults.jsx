import React from "react";
import Modal from "react-modal";
import { CloseButton , CloseButtonWrapper } from "./styles";
import { MapWithGroundOverlay } from "./ResultMap";
// import Keys from "../../keys";
import { MapWrapper, SourceTitle, ToggleWrapper } from "./ShowMapsModal.styles";
import Legend from "../Legend/Legend";
import { CheckBox, CheckBoxLabel, CheckBoxWrapper } from "../ToggleSwitch/ToggleSwitch.styles";
import { MapWithGroundOverlayMRP } from "./ResultMapMRP";
import { MissingMapDialog } from "../ConfirmationDialog/MissingMapDialog";


const GMapsResults = ({ modalVisiblity, showModal }) => {
  const [isChecked, setIsChecked] = React.useState(false);
  const [ showConfirmationBox, setConfirmationBox ] = React.useState(false);
  const onChange = (e) => {
    const isChecked = e.target.checked;
    setIsChecked(isChecked);
  }

  const handleClose = () => {
    showModal(false, "show-maps-google", false);
  }
  const closeConfirmationModal = () => {
    setConfirmationBox(false);
  }

  const customStyles = {
    content : {
      background: '#f2f8eb'
    }
  };
  // const MAP_KEY= process.env.MAP_KEY;
  const MAP_KEY= 'AIzaSyA2OpklAqYs8yn_1L7-VJnY5RG0f9QGhy4';
  return (
    <Modal
      isOpen={modalVisiblity}
      onRequestClose={handleClose}
      ariaHideApp={false}
      contentLabel="Porównaj wyniki"
      style={ customStyles }
    >
      <CloseButtonWrapper>
        <CloseButton onClick={showModal(false, "show-maps-google", false)}><span>&#10006;</span></CloseButton>
      </CloseButtonWrapper>

      <Legend />
      <ToggleWrapper>
        <SourceTitle>Mapy radiopolska</SourceTitle>
        <CheckBoxWrapper>
        <CheckBox id="checkbox" type="checkbox" checked={isChecked} onChange={onChange}/>
        <CheckBoxLabel htmlFor="checkbox" />
      </CheckBoxWrapper>
      <SourceTitle>tl_p2001</SourceTitle>
      </ToggleWrapper>
      <MapWrapper>
        {isChecked === true ?
       <MapWithGroundOverlay
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${MAP_KEY}&v=3.exp&libraries=geometry,drawing,places`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `700px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          isChecked={isChecked}
          setConfirmationBox={setConfirmationBox}
        /> :
        <MapWithGroundOverlayMRP
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${MAP_KEY}&v=3.exp&libraries=geometry,drawing,places`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `700px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          isChecked={isChecked}
      /> }
      </MapWrapper>
    {showConfirmationBox === true ?
          <MissingMapDialog title="Brak mapy w bazie !" message="Brak mapy w bazie !" onClickClose={()=> closeConfirmationModal()} /> : null}
    </Modal>
  );
};

export default GMapsResults;
