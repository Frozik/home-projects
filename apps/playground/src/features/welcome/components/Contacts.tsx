import { GithubOutlined, LinkOutlined, MailOutlined, WhatsAppOutlined } from '@ant-design/icons';
import { Button, QRCode, Tooltip } from 'antd';
import { memo } from 'react';

import cvUrl from '../../../assets/Sharov_Dmitry_Nikolaevich.pdf';
import { SvgTelegram } from '../../../icons/SvgTelegram';
import styles from '../styles.module.scss';
import { getAge } from '../utils';

export const Contacts = memo(() => (
    <div>
        <h2>
            Sharov Dmitry Nikolaevich{' '}
            <Button
                type="link"
                icon={<LinkOutlined />}
                href={cvUrl}
                target="_blank"
                rel="noreferrer"
            >
                PDF
            </Button>
        </h2>

        <p>Male, {getAge()} years, born on 10 November 1982</p>

        <address className={styles.infoBlock}>
            <ul>
                <li>
                    <Tooltip
                        title={<QRCode size={256} errorLevel="H" value="https://t.me/Frozik" />}
                    >
                        <a href="https://t.me/Frozik" target="_blank" rel="noreferrer">
                            <SvgTelegram style={{ fill: '#ffffff' }} />
                            @Frozik
                        </a>
                    </Tooltip>
                    — preferred means of communication
                </li>
                <li>
                    <Tooltip
                        title={
                            <QRCode
                                size={256}
                                errorLevel="H"
                                value="https://wa.me/qr/TCOFX34ZSPXDN1"
                            />
                        }
                    >
                        <a href="https://wa.me/79817151041" target="_blank" rel="noreferrer">
                            <WhatsAppOutlined />
                            Dmitry Sharov
                        </a>
                    </Tooltip>
                </li>
                <li>
                    <a href="mailto:frozik@gmail.com">
                        <MailOutlined />
                        frozik@gmail.com
                    </a>
                </li>
                <li>
                    <a href="https://github.com/frozik" target="_blank" rel="noreferrer">
                        <GithubOutlined />
                        frozik
                    </a>
                </li>
            </ul>
        </address>

        <aside className={styles.infoBlock}>
            <p>Reside in: Saint Petersburg, metro station Komendantskiy Prospekt</p>
            <p>Citizenship: Russia, work permit at: Russia</p>
            <p>I am not ready to relocate, but I am open to occasional business trips.</p>
        </aside>
    </div>
));
