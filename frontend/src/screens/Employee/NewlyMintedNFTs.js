import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import {
  employeeFetchNewlyMintedNFTsAction,
  employeeFetchNewlyMintedNFTsClean,
  employeeSendEmailAction,
} from "../../actions/employeeActions";
import "../../styles/screens/employee.css";

function NewlyMintedNFTs({ closeFnc, user, type }) {
  const dispatch = useDispatch();

  // state

  const nftsAPI = {
    newlyMintedAPI:
      "https://api.opensea.io/api/v1/assets?order_direction=desc&limit=10&include_orders=false",
    popularAPI:
      "https://api.opensea.io/api/v1/assets?order_direction=desc&limit=10&include_orders=false",
    recentlySoldAPI:
      "https://api.opensea.io/api/v1/assets?order_direction=desc&limit=10&include_orders=false",
  };
  const [title, setTitle] = useState();
  const [api, setApi] = useState();

  // useSelectors
  const { loading, newlyMintedNFTs: assets } = useSelector(
    (state) => state.employeeFetchNewlyMintedNFTsReducer
  );
  const { employeeById } = useSelector((state) => state.employeeByIdReducer);

  // handlers
  const closeDiv = () => {
    console.log("I ran......");
    dispatch(employeeFetchNewlyMintedNFTsClean());
    closeFnc(false);
  };
  const fetchNFTsHandler = () => {
    dispatch(employeeFetchNewlyMintedNFTsAction(api));
  };
  const sendEmail = () => {
    const employeeEmail = employeeById.email;
    const password = employeeById.email_password;
    const subject = "NFT UPDATE FROM AESTHETIC.COM";
    const userEmail = user.email;
    dispatch(
      employeeSendEmailAction({
        employeeEmail,
        password,
        assets,
        subject,
        userEmail,
        title,
      })
    );
  };

  useEffect(() => {
    if (type === "newlyMinted") {
      setTitle("Newly Minted NFTs in OpenSea");
      setApi(nftsAPI.newlyMintedAPI);
    }
    if (type === "popularNFTs") {
      setTitle("Popular NFTs in OpenSea");
      setApi(nftsAPI.popularAPI);
    }
    if (type === "recentlySold") {
      setTitle("Recently Sold NFTs in OpenSea");
      setApi(nftsAPI.recentlySoldAPI);
    }
  }, []);

  return (
    <div>
      <div className="home__admin__login">
        <div className="employee__add__container">
          <div className="title__and__close">
            <div className="admin__login__title">{title}</div>
            <div className="close__icon">
              <CloseIcon onClick={closeDiv}></CloseIcon>
            </div>
          </div>
          {assets && (
            <NFTsContainer assets={assets} emailHeader={title}></NFTsContainer>
          )}
          <div>
            <button
              className="login__employee__button"
              onClick={fetchNFTsHandler}
            >
              FETCH new minted NFTs
            </button>
          </div>
          {loading && <Loader></Loader>}
          {assets && <button onClick={sendEmail}>Send email</button>}
        </div>
      </div>
    </div>
  );
}

export default NewlyMintedNFTs;

function NFTsContainer({ assets, emailHeader }) {
  return (
    <>
      {assets && (
        <>
          <span>This is the preview of your email👇</span>
          <h1>
            This is NFTs update from
            <a href="https://www.aesthetic.com/">Aesthetic.com</a>
          </h1>
          <h4>{emailHeader}</h4>
          <div>
            <div class="two_div_nft_container">
              {assets &&
                assets.map((asset) => (
                  <div class="nft_div">
                    <div>
                      <img
                        src={asset.image_url}
                        alt={asset.id}
                        height="300px"
                        style={{ borderRadius: "10px" }}
                      />
                    </div>

                    <div class="details_div">
                      <div class="div_1" style={{ textAlign: "left" }}>
                        <div>
                          {" "}
                          <b>Collection:</b> {asset.collection.name}
                        </div>
                        <div>
                          <b>NFT Name:</b>
                          {asset.name}
                        </div>
                        <a
                          href={asset.permalink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Link to OpenSea NFT
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
