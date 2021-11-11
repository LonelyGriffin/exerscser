import {Path} from '../entity/path';

const PROTOCOLS = ['file:///', 'http://', 'https://'];

export const getParentPath = (path: Path) => {
  const lastSlashIndex = path.lastIndexOf('/');
  const protocol = getProtocol(path);

  if (!protocol) {
    throw `Expected path with known protocol, but passed ${path}`;
  }

  if (lastSlashIndex < protocol.length) {
    return undefined;
  }

  return path.slice(0, lastSlashIndex);
};

export const resolvePath = (...parts: string[]): Path => {
  const protocol = getProtocol(parts[0]) || 'file:///';
  const body = parts.map(withoutProtocol).map(normalizePart).join('/');
  return protocol + applyRelatives(body);
};

export const pathToRealmFilePath = (path: Path) => '/' + normalizePart(withoutProtocol(path));

//region Utils

const applyRelatives = (part: string) => {
  const components = part.split('/');

  return components.filter((component, i) => component[i + 1] !== '..').join('/');
};

const normalizePart = (part: string) => {
  const components = part.split('/');

  return components.filter(component => component !== '' && component !== '.').join('/');
};

const withoutProtocol = (part: string) => {
  for (const protocol of PROTOCOLS) {
    const protocolName = protocol.split(':')[0];

    if (part.startsWith(protocolName)) {
      const withoutName = part.slice(protocolName.length);
      return withoutName.startsWith(':') ? withoutName.slice(1) : withoutName;
    }
  }
  return part;
};

const getProtocol = (part: string) => {
  for (const protocol of PROTOCOLS) {
    const protocolName = protocol.split(':')[0];

    if (part.startsWith(protocolName)) {
      return protocol;
    }
  }

  return undefined;
};

//endregion
