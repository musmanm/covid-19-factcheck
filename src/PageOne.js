import React, { Component} from 'react';
import './PageOne.css';


class PageOne extends Component {

  render(){
    return (
      <div><img style={{width: '100%'}} src="covid-192.jpg"></img>
      <div id="wrapper">
        
        <div id="main">
        <div id="content">
            <section>
                <div className="container">
                    <h1>What is COVID-19</h1>
                    <p>Coronaviruses are a family of viruses that can cause illnesses such as the common cold, severe acute respiratory syndrome (SARS) and Middle East respiratory syndrome (MERS). In 2019, a new coronavirus was identified as the cause of a disease outbreak that originated in China.</p>
                    <p>The virus is now known as the severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2). The disease it causes is called coronavirus disease 2019 (COVID-19).</p>
                    <p>Cases of COVID-19 have been reported in a growing number of countries, including the U.S. Public health groups, such as the World Health Organization (WHO) and the U.S. Centers for Disease Control and Prevention (CDC), are monitoring the situation and posting updates on their websites. WHO declared a global pandemic in March 2020. These groups have also issued recommendations for preventing and treating the illness.</p>
                </div>
            </section>
            <section className="color">
                <div className="container">
                    <h1>Symptoms</h1>
                    <p>Signs and symptoms of COVID-19 may appear two to 14 days after exposure and can include:</p>
                        <div className='uldiv'>
                          <ul>
                            <li>Fever</li>
                            <li>Cough</li>
                            <li>Shortness of breath or difficulty breathing</li>
                          </ul>
                        </div>
                        <p></p>
                        <p>Other symptoms can include:</p>
                        <div className='uldiv'>
                          <ul>
                            <li>Tiredness</li>
                            <li>Aches</li>
                            <li>Runny nose</li>
                            <li>Sore throat</li>
                          </ul>
                        </div>

                      <p></p>
                    <p>The severity of COVID-19 symptoms can range from very mild to severe. Some people have no symptoms. People who are older or have existing chronic medical conditions, such as heart or lung disease or diabetes, may be at higher risk of serious illness. This is similar to what is seen with other respiratory illnesses, such as influenza.</p>
                </div>
            </section>
          <section>
                <div className="container">
                    <h1>Precautions</h1>
                    <p>Although there is no vaccine available to prevent infection with the new coronavirus, you can take steps to reduce your risk of infection. WHO and CDC recommend following these precautions for avoiding COVID-19:</p>
                    <div className='uldiv'>
                          <ul>
                            <li>Avoid large events and mass gatherings.</li>
                            <li>Avoid close contact (about 6 feet) with anyone who is sick or has symptoms.</li>
                            <li>Keep distance between yourself and others if COVID-19 is spreading in your community, especially if you have a higher risk of serious illness.</li>
                            <li>Wash your hands often with soap and water for at least 20 seconds, or use an alcohol-based hand sanitizer that contains at least 60% alcohol.</li>
                            <li>Cover your mouth and nose with your elbow or a tissue when you cough or sneeze. Throw away the used tissue.</li>
                            <li>Avoid touching your eyes, nose and mouth if your hands aren't clean.</li>
                            <li>Avoid sharing dishes, glasses, bedding and other household items if you're sick.</li>
                            <li>Clean and disinfect surfaces you often touch on a daily basis.</li>
                            <li>Stay home from work, school and public areas if you're sick, unless you're going to get medical care. Avoid taking public transportation if you're sick.</li>
                          </ul>
                        </div>
                </div>
            </section>
      </div>
    </div>
  </div>
  </div>
    );
  }
}

export default PageOne;
