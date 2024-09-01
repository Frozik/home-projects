import { Flex, Tag } from 'antd';
import cn from 'classnames';
import { memo } from 'react';

import styles from '../Welcome.module.scss';

export const Skills = memo(() => (
    <>
        <h2 className={styles.cardTitle}>Key skills</h2>
        <section className={cn(styles.card, styles.cardWithTitle, styles.cardWithRowMode)}>
            <div className={styles.flexStretch}>
                <Flex gap="4px 0" wrap>
                    <Tag color="magenta" bordered={false}>
                        JavaScript
                    </Tag>
                    <Tag color="magenta" bordered={false}>
                        TypeScript
                    </Tag>
                    <Tag color="magenta" bordered={false}>
                        CSS
                    </Tag>
                    <Tag color="magenta" bordered={false}>
                        SCSS
                    </Tag>
                    <Tag color="magenta" bordered={false}>
                        HTML
                    </Tag>

                    <Tag color="gold" bordered={false}>
                        NX
                    </Tag>
                    <Tag color="gold" bordered={false}>
                        Lerna
                    </Tag>
                    <Tag color="gold" bordered={false}>
                        Rush
                    </Tag>

                    <Tag color="lime" bordered={false}>
                        npm
                    </Tag>
                    <Tag color="lime" bordered={false}>
                        pnpm
                    </Tag>
                    <Tag color="lime" bordered={false}>
                        yarn
                    </Tag>

                    <Tag color="green" bordered={false}>
                        React
                    </Tag>
                    <Tag color="green" bordered={false}>
                        React Router
                    </Tag>
                    <Tag color="green" bordered={false}>
                        Redux
                    </Tag>
                    <Tag color="green" bordered={false}>
                        Redux Saga
                    </Tag>
                    <Tag color="green" bordered={false}>
                        Redux Toolkit
                    </Tag>
                    <Tag color="green" bordered={false}>
                        RxJs
                    </Tag>
                    <Tag color="green" bordered={false}>
                        TensorFlow JS
                    </Tag>
                    <Tag color="green" bordered={false}>
                        WebGL
                    </Tag>

                    <Tag color="cyan" bordered={false}>
                        Git
                    </Tag>

                    <Tag color="geekblue" bordered={false}>
                        Vite
                    </Tag>
                    <Tag color="geekblue" bordered={false}>
                        ESBuild
                    </Tag>
                    <Tag color="geekblue" bordered={false}>
                        webpack
                    </Tag>

                    <Tag color="purple" bordered={false}>
                        OAuth 2.0
                    </Tag>
                    <Tag color="purple" bordered={false}>
                        JWT
                    </Tag>
                    <Tag color="purple" bordered={false}>
                        WebSSO
                    </Tag>

                    <Tag color="orange" bordered={false}>
                        node.js
                    </Tag>
                </Flex>
            </div>
        </section>
    </>
));
