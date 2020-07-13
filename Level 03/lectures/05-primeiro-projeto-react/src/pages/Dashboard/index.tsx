import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories } from './styles';

const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore repositórios no Github.</Title>

      <Form>
        <input placeholder="Digite o nome do repositório" />
        <button type="submit">Pesquisar</button>
      </Form>
      <Repositories>
        <a href="teste">
          <img
            src="https://avatars0.githubusercontent.com/u/25828420?s=460&u=feac06e502081c1f4fe8687c8d1ead713c501069&v=4"
            alt="Alexandre"
          />
          <div>
            <strong>alexguimenti / whatsappAudioSpeedChanger</strong>
            <p>
              A Google Chrome Extension to change audio speed on Web Whatsapp.
            </p>
          </div>
          <FiChevronRight size={20} />
        </a>
        <a href="teste">
          <img
            src="https://avatars0.githubusercontent.com/u/25828420?s=460&u=feac06e502081c1f4fe8687c8d1ead713c501069&v=4"
            alt="Alexandre"
          />
          <div>
            <strong>alexguimenti / whatsappAudioSpeedChanger</strong>
            <p>
              A Google Chrome Extension to change audio speed on Web Whatsapp.
            </p>
          </div>
          <FiChevronRight size={20} />
        </a>
        <a href="teste">
          <img
            src="https://avatars0.githubusercontent.com/u/25828420?s=460&u=feac06e502081c1f4fe8687c8d1ead713c501069&v=4"
            alt="Alexandre"
          />
          <div>
            <strong>alexguimenti / whatsappAudioSpeedChanger</strong>
            <p>
              A Google Chrome Extension to change audio speed on Web Whatsapp.
            </p>
          </div>
          <FiChevronRight size={20} />
        </a>
      </Repositories>
    </>
  );
};

export default Dashboard;
