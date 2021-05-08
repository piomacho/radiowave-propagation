import React, { useState, useCallback } from "react";
import Stations from "../Stations/Stations";
import Adapters from "../Adapters/Adapters";
import {
  Wrapper,
  ButtonWrapper,
  LoaderOverLay,
  SubmitPlotMemoButton,
  SendToOctaveButton,
  NavigationPanel,
  NavigationWrapper, SendAllToOctaveButton, ShowResultMapsButton, SubmitMapsButton, ShowResultGMapsMapsButton
} from "./SelectionPanel.styles";
import store from "../../Store/Store";
import Loader from "react-loader-spinner";
import { LoaderContainer } from "../Adapters/Adapters.style";
// import ShowMapsModal from "../ShowMapsModal/ShowMapsModal";
import GMapsResults from "../GMapsResults/GMapsResults";


const SelectionPanel = () => {
  const { useGlobalState } = store;
  const [plotModalVisiblity, setPlotModalVisiblity] = useState(false);
  const [mapsModalVisiblity, setMapsModalVisiblity] = useState(false);
  const [exportModalVisiblity, setExportModalVisiblity] = useState(false);
  const [exportAllModalVisiblity, setExportAllModalVisiblity] = useState(false);
  const [showMapsModalVisiblity, setShowMapsModalVisiblity] = useState(false);
  const [loading, setLoading] = useState(false);
  const [adapter] = useGlobalState("adapter");

  const triggerState = (value, type) => {
    switch (type) {
      case "plot":
        return setPlotModalVisiblity(value);
      case "maps":
        return setMapsModalVisiblity(value);
      case "export":
        return setExportModalVisiblity(value);
      case "export-all":
          return setExportAllModalVisiblity(value);
      case "show-maps":
          return setShowMapsModalVisiblity(value);
      case "show-maps-google":
          return setMapsModalVisiblity(value);
    }
  };

  const showModal = useCallback(
    (value, type, query, onClose) => () => {
      if(onClose){
        onClose();
      }
      triggerState(value, type);
      if (value && query) {
        // getCoordinates();
      }
    },
    [plotModalVisiblity, adapter, exportAllModalVisiblity ]
  );

  return (
    <Wrapper>
      <Stations />
      <Adapters />
      <NavigationWrapper>
        <NavigationPanel>
          {/* <ButtonWrapper>
            <SubmitPlotMemoButton callback={showModal(true, "plot", true)} />
          </ButtonWrapper> */}
          {/* <ButtonWrapper>
            <SubmitMapsButton callback={showModal(true, "maps", true)} />
          </ButtonWrapper> */}
          {/* <ButtonWrapper>
            <SendToOctaveButton callback={showModal(true, "export", false)} />
          </ButtonWrapper>
          <ButtonWrapper>
            <SendAllToOctaveButton callback={showModal(true, "export-all", false)} />
          </ButtonWrapper> */}
          {/* <ButtonWrapper>
            <ShowResultMapsButton callback={showModal(true, "show-maps", false)} />
          </ButtonWrapper> */}
          <ButtonWrapper>
            <ShowResultGMapsMapsButton callback={showModal(true, "show-maps-google", false)} />
          </ButtonWrapper>
        </NavigationPanel>
      </NavigationWrapper>
      {loading ? (
        <LoaderOverLay>
          <LoaderContainer>
            <Loader type="Watch" color="#fff" height={100} width={100} />
          </LoaderContainer>
        </LoaderOverLay>
      ) : null}
        {/* <ShowMapsModal
          showModal={showModal}
          modalVisiblity={showMapsModalVisiblity}
        /> */}
        <GMapsResults showModal={showModal} modalVisiblity={mapsModalVisiblity} />
    </Wrapper>
  );
};

export default SelectionPanel;
