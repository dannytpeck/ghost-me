import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';
import UploadModal from './upload_modal';

/* global $ */

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clients: [],
      eventId: '',
      eventName: '',
      pointsAwarded: '',
      maxOccurrences: ''
    };

    this.submitData = this.submitData.bind(this);
    this.fetchPsk = this.fetchPsk.bind(this);
  }

  componentDidMount() {
    $.getJSON('https://api.airtable.com/v0/appHXXoVD1tn9QATh/Clients?api_key=keyCxnlep0bgotSrX&view=sorted').done(data => {
      let records = data.records;

      if (data.offset) {
        $.getJSON(`https://api.airtable.com/v0/appHXXoVD1tn9QATh/Clients?api_key=keyCxnlep0bgotSrX&view=sorted&offset=${data.offset}`).done(data => {
          this.setState({
            clients: [...records, ...data.records]
          });
        });
      } else {
        this.setState({
          clients: records
        });
      }

    });
  }

  submitData(e) {
    e.preventDefault();

    // Forced to use the old API
    const csv = createCSV();
    console.log(csv);
    uploadToLimeade(csv);

    // Create a CSV for CIE uploads
    function createCSV() {
      let data = [[
        'EmployerName',
        'EventId',
        'EventName',
        'DisplayPriority',
        'RewardType',
        'PointsAwarded',
        'RewardDescription',
        'AllowSameDayDuplicates',
        'IsOngoing',
        'IsDisabled',
        'ShowInProgram',
        'IsSelfReport',
        'DataFeedMode',
        'Notify',
        'ButtonText',
        'TargetUrl',
        'EventImageUrl',
        'MaxOccurrences',
        'StartDate',
        'EndDate',
        'ViewPages',
        'Dimensions',
        'ShortDescription',
        'HtmlDescription',
        'SubgroupId',
        'Field1Name',
        'Field1Value',
        'Field2Name',
        'Field2Value',
        'Field3Name',
        'Field3Value'
      ]];


      const employerName = $('#employerName').val();

      const eventName = $('#eventName').val();
      const eventId = $('#eventId').val();
      const pointsAwarded = $('#pointsAwarded').val();
      const maxOccurrences = $('#maxOccurrences').val();

      const cie = [
        employerName,
        eventId,
        '"' + eventName + '"',
        '',
        'IncentivePoints',
        pointsAwarded.replace(',', ''),
        '',
        '1',
        '0',
        '0',
        '0',
        '0',
        '0',
        '0',
        '',
        '',
        '',
        maxOccurrences,
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        ''
      ];

      data.push(cie);

      return data;
    }

    // Upload CSV to Limeade
    function uploadToLimeade(csv) {
      const headers = csv[0].join(',');
      const url = 'https://calendarbuilder.dev.adurolife.com/limeade-upload/';
      // const url = 'http://mywellnessnumbers.sftp.adurolife.com/limeade-upload/';

      const oneIncentiveEvent = csv[1].join(',');

      const params = {
        e: $('#employerName').val(),
        psk: $('#psk').val(),
        data: headers + '\n' + oneIncentiveEvent,
        type: 'IncentiveEvents'
      };

      // Open Modal
      $('#uploadModal').modal('show');
      $('#uploadModalBody').html('<p>Uploading...</p>');

      $.post(url, params).done(function(response) {
        $('#uploadModalBody').append(`<p>${response}</p>`);
        console.log(response);
      });

    }

  }

  fetchPsk(e) {
    this.state.clients.forEach((client) => {
      if (client.fields['Limeade e='] === e.target.value) {
        $('#psk').val(client.fields['Limeade PSK']);
      }
    });
  }

  renderEmployerNames() {
    return this.state.clients.map((client) => {
      return <option key={client.id}>{client.fields['Limeade e=']}</option>;
    });
  }

  setEventName(e) {
    this.setState({ eventName: e.target.value });
  }

  setEventId(e) {
    this.setState({ eventId: e.target.value });
  }

  setPointsAwarded(e) {
    this.setState({ pointsAwarded: e.target.value });
  }

  setMaxOccurrences(e) {
    this.setState({ maxOccurrences: e.target.value });
  }

  render() {
    return (
      <div id="app">
        <Header />

        { /* Hidden input that holds the PSK */ }
        <input type="text" className="form-control" id="psk" />

        <div className="row">
          <div className="col">
            <form id="form">
              <div className="form-group">
                <label htmlFor="employerName">EmployerName</label>
                <select id="employerName" className="form-control custom-select" onChange={this.fetchPsk} disabled={this.state.hasLoaded}>
                  <option defaultValue>Select Employer</option>
                  {this.renderEmployerNames()}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="eventName">Event Name</label>
                <input type="text" className="form-control" id="eventName" placeholder="Participate in an Event" value={this.state.eventName} onChange={(e) => this.setEventName(e)} />
              </div>
              <div className="form-group">
                <label htmlFor="eventId">Event ID</label>
                <input type="text" className="form-control" id="eventId" placeholder="9100" value={this.state.eventId} onChange={(e) => this.setEventId(e)} />
              </div>
              <div className="form-group">
                <label htmlFor="pointsAwarded">Points Awarded</label>
                <input type="text" className="form-control" id="pointsAwarded" placeholder="0" value={this.state.pointsAwarded} onChange={(e) => this.setPointsAwarded(e)} />
              </div>
              <div className="form-group">
                <label htmlFor="maxOccurrences">Max Occurrences</label>
                <input type="text" className="form-control" id="maxOccurrences" placeholder="1" value={this.state.maxOccurrences} onChange={(e) => this.setMaxOccurrences(e)} />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary" onClick={this.submitData}>Create/Update CIE</button>
              </div>
            </form>

            <UploadModal />

          </div>
        </div>

        <Footer />

      </div>
    );
  }
}

export default App;
