import React from "react";

export default function Preloader() {
  return (
    <div className="preloader-area mg-tb-15">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
            <div className="preloader-single mt-b-30">
              <div className="ts_preloading_box">
                <div id="ts-preloader-absolute02">
                  <div className="tsperloader2" id="tsperloader2_four" />
                  <div className="tsperloader2" id="tsperloader2_three" />
                  <div className="tsperloader2" id="tsperloader2_two" />
                  <div className="tsperloader2" id="tsperloader2_one" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
