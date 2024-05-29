import React from "react";
import "../components/Home.css";

const Home = () => {
  return (
    <>
      <div>
        <h1 className="title">Home Page</h1>
        <br />
        <section className="searchbar">
          <section className="searchbar-content">
            <section className="filter">
              <h1>name</h1>
            </section>
            <section className="filter">
              <h1>type</h1>
            </section>
            <h1>org</h1>
            <h1>date/duration</h1>
          </section>
        </section>
      </div>
    </>
  );
};

export default Home;

/* <div className="Frame38" style={{width: 1232, height: 280, paddingTop: 16, paddingBottom: 32, paddingLeft: 32, paddingRight: 32, background: 'white', boxShadow: '0px 4px 16px rgba(141, 211, 187, 0.15)', borderRadius: 16, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 32, display: 'inline-flex'}}>
  <div className="Frame2608739" style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 48, display: 'flex'}}>
    <div className="Frame2608738" style={{justifyContent: 'flex-start', alignItems: 'center', gap: 32, display: 'inline-flex'}}>
      <div className="Frame2608721" style={{justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
        <div className="Airplane" style={{width: 24, height: 24, paddingLeft: 0.75, paddingRight: 0.75, paddingTop: 2.25, paddingBottom: 2.25, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
          <div className="Vector" style={{width: 22.50, height: 19.50, background: '#112211'}}></div>
        </div>
        <div className="Flights" style={{color: '#112211', fontSize: 16, fontFamily: 'Montserrat', fontWeight: '600', wordWrap: 'break-word'}}>Flights</div>
      </div>
      <div className="Line1" style={{width: 48, height: 0, transform: 'rotate(90deg)', transformOrigin: '0 0', border: '1px #D7E2EE solid'}}></div>
      <div className="Frame2608722" style={{justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
        <div className="IonBed" style={{width: 24, height: 24, paddingLeft: 1.50, paddingRight: 1.50, paddingTop: 3.75, paddingBottom: 3.75, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
          <div className="Vector" style={{width: 21, height: 16.50, background: '#112211'}}></div>
        </div>
        <div className="Stays" style={{color: '#112211', fontSize: 16, fontFamily: 'Montserrat', fontWeight: '600', wordWrap: 'break-word'}}>Stays</div>
      </div>
    </div>
    <div className="Frame40" style={{width: 1184, justifyContent: 'flex-start', alignItems: 'center', gap: 24, display: 'inline-flex'}}>
      <div className="TextField" style={{flex: '1 1 0', height: 56, borderTopLeftRadius: 4, borderTopRightRadius: 4, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
        <div className="TextField" style={{alignSelf: 'stretch', height: 56, background: 'white', borderRadius: 4, border: '1px #79747E solid', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'flex'}}>
          <div className="StateLayer" style={{alignSelf: 'stretch', paddingTop: 4, paddingBottom: 4, paddingLeft: 16, borderTopLeftRadius: 4, borderTopRightRadius: 4, justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
            <div className="Content" style={{flex: '1 1 0', height: 40, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', display: 'inline-flex'}}>
              <div className="LabelText" style={{paddingLeft: 4, paddingRight: 4, background: 'white', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                <div className="LabelText" style={{color: '#112211', fontSize: 14, fontFamily: 'Montserrat', fontWeight: '400', wordWrap: 'break-word'}}>Name</div>
              </div>
            </div>
            <div className="TrailingIcon" style={{width: 48, height: 48, padding: 12, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
              <div className="IonSwapHorizontal" style={{width: 24, height: 24, paddingLeft: 4.50, paddingRight: 4.50, paddingTop: 2.25, paddingBottom: 2.25, justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
                <div className="Vector" style={{width: 15, height: 19.50, border: '1.50px black solid'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="TextField" style={{width: 140, height: 56, borderTopLeftRadius: 4, borderTopRightRadius: 4, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
        <div className="TextField" style={{alignSelf: 'stretch', height: 56, background: 'white', borderRadius: 4, border: '1px #79747E solid', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'flex'}}>
          <div className="StateLayer" style={{alignSelf: 'stretch', paddingTop: 4, paddingBottom: 4, paddingLeft: 16, borderTopLeftRadius: 4, borderTopRightRadius: 4, justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
            <div className="Content" style={{flex: '1 1 0', height: 40, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', display: 'inline-flex'}}>
              <div className="LabelText" style={{paddingLeft: 4, paddingRight: 4, background: 'white', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                <div className="LabelText" style={{color: '#112211', fontSize: 14, fontFamily: 'Montserrat', fontWeight: '400', wordWrap: 'break-word'}}>Type</div>
              </div>
            </div>
            <div className="TrailingIcon" style={{width: 48, height: 48, padding: 12, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
              <div className="ChevronDown" style={{width: 24, height: 24, paddingTop: 9, paddingBottom: 8.25, paddingLeft: 5.25, paddingRight: 5.25, justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
                <div className="Vector" style={{width: 13.50, height: 6.75, border: '1.50px black solid'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="TextField" style={{flex: '1 1 0', height: 56, borderTopLeftRadius: 4, borderTopRightRadius: 4, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
        <div className="TextField" style={{alignSelf: 'stretch', height: 56, background: 'white', borderRadius: 4, border: '1px #79747E solid', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'flex'}}>
          <div className="StateLayer" style={{width: 210, paddingTop: 8, paddingBottom: 8, paddingLeft: 16, borderTopLeftRadius: 4, borderTopRightRadius: 4, justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
            <div className="Content" style={{flex: '1 1 0', height: 40, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', display: 'inline-flex'}}>
              <div className="LabelText" style={{paddingLeft: 4, paddingRight: 4, background: 'white', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                <div className="LabelText" style={{color: '#1C1B1F', fontSize: 14, fontFamily: 'Montserrat', fontWeight: '400', wordWrap: 'break-word'}}>Date/Duration</div>
              </div>
              <div className="InputText" style={{justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                <div className="InputText" style={{color: '#1C1B1F', fontSize: 16, fontFamily: 'Montserrat', fontWeight: '400', wordWrap: 'break-word'}}>07 Nov 22 - 13 Nov 22</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="TextField" style={{flex: '1 1 0', height: 56, borderTopLeftRadius: 4, borderTopRightRadius: 4, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
        <div className="TextField" style={{alignSelf: 'stretch', height: 56, background: 'white', borderRadius: 4, border: '1px #79747E solid', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'flex'}}>
          <div className="StateLayer" style={{alignSelf: 'stretch', paddingTop: 8, paddingBottom: 8, paddingLeft: 16, borderTopLeftRadius: 4, borderTopRightRadius: 4, justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
            <div className="Content" style={{flex: '1 1 0', height: 40, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', display: 'inline-flex'}}>
              <div className="LabelText" style={{paddingLeft: 4, paddingRight: 4, background: 'white', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                <div className="LabelText" style={{color: '#1C1B1F', fontSize: 14, fontFamily: 'Montserrat', fontWeight: '400', wordWrap: 'break-word'}}>idt we need this</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="Line4" style={{width: 100, height: 0, border: '4px #8DD3BB solid'}}></div>
  <div className="Frame46" style={{alignSelf: 'stretch', justifyContent: 'flex-end', alignItems: 'center', gap: 24, display: 'inline-flex'}}>
    <div className="Button" style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
      <div className="StyleLayer" style={{height: 48, paddingTop: 8, paddingBottom: 8, borderRadius: 4, justifyContent: 'center', alignItems: 'center', gap: 4, display: 'inline-flex'}} />
    </div>
    <div className="Button" style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
      <div className="StyleLayer" style={{height: 48, paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8, background: '#8DD3BB', borderRadius: 4, justifyContent: 'center', alignItems: 'center', gap: 4, display: 'inline-flex'}}>
        <div className="PaperPlane" style={{width: 16, height: 16, padding: 1, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
          <div className="Vector" style={{width: 14, height: 14, background: 'black', border: '0.05px #112211 solid'}}></div>
        </div>
        <div className="Button" style={{color: '#112211', fontSize: 14, fontFamily: 'Montserrat', fontWeight: '500', wordWrap: 'break-word'}}>Show Opportunities</div>
      </div>
    </div>
  </div>
</div> */
