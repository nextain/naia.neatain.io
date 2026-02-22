Naia OS는 완벽한 리눅스(Linux) 환경을 타겟으로 설계되었습니다. 특히 Bazzite와 같은 Immutable OS 환경이나 샌드박스(Flatpak) 환경에서 안전하게 동작합니다.

## 시스템 요구사항

- **OS**: Linux (Bazzite, Ubuntu, Fedora 등)
- **Wayland / X11**: 모두 지원하나 Wayland 권장
- **런타임**: Node.js 22 이상 (소스 빌드 시)
- **데몬**: Systemd User Service 지원

---

## 배포 방식 안내

Naia OS는 "AI가 OS를 직접 다루는" 독특한 컨셉을 가지고 있어 배포 방식이 매우 중요합니다.

### 1. Flatpak 배포 (권장)
가장 보편적이고 안전한 리눅스 앱 배포 방식입니다. 앱스토어(Discover, GNOME Software)를 통해 쉽게 설치할 수 있습니다.

- **안전한 격리**: 앱의 UI(Tauri)와 핵심 에이전트(Node.js)는 완벽하게 샌드박스 내부에서 동작합니다.
- **호스트 제어**: AI가 터미널 명령어(ex. 패키지 설치, 파일 시스템 관리)를 실행할 때만 `flatpak-spawn --host`를 통해 안전하게 샌드박스를 우회하여 호스트 OS에 명령을 내립니다.
- **설치 방법**:
  [다운로드 페이지](/ko/download)에서 `.flatpak` 번들을 받아 터미널에서 설치합니다.
  ```bash
  flatpak install --user ./Naia-Shell-x86_64.flatpak
  ```

> **다른 형식도 지원합니다**: AppImage, DEB (Debian/Ubuntu), RPM (Fedora/RHEL). [다운로드 페이지](/ko/download)에서 모든 형식을 확인하세요.

### 2. Bazzite / BlueBuild 통합 이미지 (고급)
사용자 정의 OS 이미지를 굽는 방식입니다. `Naia OS`는 Bazzite의 BlueBuild 레시피를 기본 제공합니다. 이 방식을 사용하면 앱이 OS 자체에 100% 통합되어 부팅하자마자 AI 아바타가 바탕화면에 뜹니다.

---

## 🛠️ (개발자용) Flatpak 로컬 빌드 방법

소스 코드에서 직접 Flatpak 샌드박스 앱을 묶어내려면 다음 절차를 따릅니다.

1. **Flatpak 빌더 설치**
   ```bash
   # Fedora / Bazzite
   sudo dnf install flatpak-builder
   
   # Ubuntu
   sudo apt install flatpak-builder
   ```

2. **빌드 종속성(SDK) 추가**
   ```bash
   flatpak remote-add --user --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
   flatpak install --user flathub org.freedesktop.Platform//24.08 org.freedesktop.Sdk//24.08
   ```

3. **패키징 빌드 실행**
   프로젝트 루트 디렉토리(Naia-OS)에서 실행합니다.
   ```bash
   # build-dir에 컴파일 및 빌드 진행
   flatpak-builder --user --install --force-clean build-dir flatpak/io.nextain.naia.yml
   ```

4. **앱 실행**
   ```bash
   flatpak run io.nextain.naia
   ```

> **💡 개발 참고:**
> Flatpak 내부에서 실행되는 AI 에이전트는 사용자의 호스트 환경을 조작하기 위해 `agent/src/gateway/tool-bridge.ts` 내부적으로 모든 `execute_command` 요청을 `flatpak-spawn --host bash -c ...` 형태로 래핑(Wrapping)하여 처리합니다.
