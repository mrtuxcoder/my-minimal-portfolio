const sectionClass = "space-y-4 border-t border-primary/10 pt-8";
const bodyClass = "text-base leading-relaxed text-secondary";
const listClass =
  "list-disc pl-5 space-y-1.5 text-base leading-relaxed text-secondary";
const headingClass = "text-xl sm:text-2xl font-semibold text-primary";

const ChronicleCaseStudy = () => (
  <div className="space-y-10">
    {/* 1. Overview */}
    <section className={sectionClass}>
      <h2 className={headingClass}>1. From Application to Deployment</h2>

      <p className={bodyClass}>
        Chronicle started as a full-stack blogging platform built with React,
        Node.js, Express, and MongoDB. Once the application was working, I
        wanted to go beyond running it locally and learn how to package,
        deploy, update, and recover the entire application in a real
        environment.
      </p>

      <p className={bodyClass}>
        The project therefore became a practical homelab exercise in Linux,
        Docker, container networking, Nginx, CI/CD, private networking, and
        persistent storage.
      </p>

      <div>
        <p className="mb-2 text-base font-semibold text-primary">
          Final deployment stack:
        </p>

        <ul className={listClass}>
          <li>React frontend served by Nginx</li>
          <li>Node.js + Express backend API</li>
          <li>MongoDB running as a container</li>
          <li>Docker Compose for service orchestration</li>
          <li>GitHub Actions for CI/CD</li>
          <li>GitHub Container Registry for application images</li>
          <li>Tailscale for private server connectivity</li>
          <li>Docker volume for persistent MongoDB data</li>
        </ul>
      </div>
    </section>

    {/* 2. Architecture */}
    <section className={sectionClass}>
      <h2 className={headingClass}>2. The Final Architecture</h2>

      <p className={bodyClass}>
        The production deployment is defined by a single Docker Compose
        configuration. The server runs three services: the frontend,
        backend, and MongoDB.
      </p>

      <pre className="overflow-x-auto rounded-lg border border-primary/10 bg-muted/40 p-4 text-sm leading-relaxed text-secondary">
{`                         Docker Compose

Browser
   │
   ▼
frontend
Nginx :80
   │
   │ /api/*
   ▼
backend
Node.js :5000
   │
   │ mongodb:27017
   ▼
mongodb
   │
   ▼
Docker named volume`}
      </pre>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-secondary">
          <thead>
            <tr className="border-b border-primary/10 text-left text-primary">
              <th className="p-2.5 font-semibold">Service</th>
              <th className="p-2.5 font-semibold">Technology</th>
              <th className="p-2.5 font-semibold">Responsibility</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b border-primary/10">
              <td className="p-2.5">Frontend</td>
              <td className="p-2.5">React + Nginx</td>
              <td className="p-2.5">
                Serves the production frontend and proxies API requests
              </td>
            </tr>

            <tr className="border-b border-primary/10">
              <td className="p-2.5">Backend</td>
              <td className="p-2.5">Node.js + Express</td>
              <td className="p-2.5">
                REST API, authentication, and application logic
              </td>
            </tr>

            <tr>
              <td className="p-2.5">Database</td>
              <td className="p-2.5">MongoDB</td>
              <td className="p-2.5">
                Persistent application data
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    {/* 3. Docker */}
    <section className={sectionClass}>
      <h2 className={headingClass}>3. Containerizing the Application</h2>

      <p className={bodyClass}>
        Instead of installing the application runtime and dependencies
        directly on the server, I created Docker images for the frontend and
        backend. MongoDB runs from the official MongoDB image.
      </p>

      <p className={bodyClass}>
        Docker Compose defines how these containers work together. The
        services share a private Docker network, so they communicate using
        Compose service names rather than hard-coded IP addresses.
      </p>

      <p className={bodyClass}>
        The frontend reaches the backend through the internal hostname{" "}
        <span className="font-semibold text-primary">backend</span>, while
        the backend reaches MongoDB through{" "}
        <span className="font-semibold text-primary">mongodb</span>.
      </p>

      <p className={bodyClass}>
        MongoDB uses a named Docker volume mounted at{" "}
        <span className="font-semibold text-primary">/data/db</span>. This
        separates database persistence from the lifecycle of the MongoDB
        container, allowing containers to be recreated without losing the
        stored data.
      </p>
    </section>

    {/* 4. Nginx */}
    <section className={sectionClass}>
      <h2 className={headingClass}>4. Nginx as the Application Entry Point</h2>

      <p className={bodyClass}>
        Nginx runs inside the frontend container and acts as the public entry
        point for Chronicle. It serves the compiled React application and
        forwards requests under{" "}
        <span className="font-semibold text-primary">/api/</span> to the
        backend service.
      </p>

      <pre className="overflow-x-auto rounded-lg border border-primary/10 bg-muted/40 p-4 text-sm leading-relaxed text-secondary">
{`Browser
   │
   ▼
Nginx :80
   │
   ├── /       → React application
   │
   └── /api/*  → backend:5000`}
      </pre>

      <p className={bodyClass}>
        This means the browser does not need to know the internal Docker
        address of the backend. Nginx provides a single entry point while
        Docker's internal DNS handles service discovery between containers.
      </p>
    </section>

    {/* 5. CI/CD */}
    <section className={sectionClass}>
      <h2 className={headingClass}>5. CI/CD with GitHub Actions</h2>

      <p className={bodyClass}>
        After the Docker deployment was working, I changed the deployment
        workflow so the server no longer needed the application source code.
        GitHub Actions became responsible for testing, building, publishing,
        and triggering the deployment.
      </p>

      <pre className="overflow-x-auto rounded-lg border border-primary/10 bg-muted/40 p-4 text-sm leading-relaxed text-secondary">
{`git push
   │
   ▼
GitHub Actions
   │
   ├── Lint
   ├── Backend tests
   └── Docker build
          │
          ▼
        GHCR
          │
          ▼
    Tailscale + SSH
          │
          ▼
     Homelab server
          │
          ├── docker compose pull
          └── docker compose up -d`}
      </pre>

      <p className={bodyClass}>
        The application images are published to GitHub Container Registry.
        During deployment, the server pulls those images and starts the
        stack using the Compose configuration.
      </p>

      <p className={bodyClass}>
        The production server therefore does not need a copy of the frontend
        or backend source tree. The application is packaged inside the
        images, while deployment configuration and environment secrets remain
        on the server.
      </p>
    </section>

    {/* 6. Private access */}
    <section className={sectionClass}>
      <h2 className={headingClass}>6. Private Homelab Access</h2>

      <p className={bodyClass}>
        The application is hosted on a Linux homelab server. Tailscale
        provides private connectivity between the server and authorized
        devices, allowing Chronicle to be accessed without exposing the
        homelab directly to the public internet.
      </p>

      <p className={bodyClass}>
        The same private connectivity is useful for deployment: GitHub
        Actions can connect to the server through SSH over the Tailscale
        network and run the deployment commands remotely.
      </p>
    </section>

    {/* 7. Database administration */}
    <section className={sectionClass}>
      <h2 className={headingClass}>7. Database Initialization</h2>

      <p className={bodyClass}>
        Chronicle already had a backend script for creating the MongoDB
        administrator credentials. After moving the backend into a Docker
        image, the script no longer needed to exist as a separate source
        directory on the server.
      </p>

      <p className={bodyClass}>
        Because the script is included in the backend image, it can be
        executed inside the running backend container. From there it can
        communicate with MongoDB through the same Docker Compose network.
      </p>

      <p className={bodyClass}>
        This keeps database initialization tied to the application image
        instead of requiring the server to maintain a separate copy of the
        backend source code.
      </p>
    </section>

    {/* 8. Real deployment failure */}
    <section className={sectionClass}>
      <h2 className={headingClass}>8. Debugging a Real Deployment Failure</h2>

      <p className={bodyClass}>
        The first automated deployment exposed a Docker networking problem.
        The frontend container exited because Nginx could not resolve the
        backend service:
      </p>

      <pre className="overflow-x-auto rounded-lg border border-primary/10 bg-muted/40 p-4 text-sm leading-relaxed text-secondary">
{`host not found in upstream "backend"`}
      </pre>

      <p className={bodyClass}>
        Instead of changing the Nginx configuration blindly, I inspected the
        actual Docker state using commands such as{" "}
        <span className="font-semibold text-primary">
          docker inspect
        </span>
        ,{" "}
        <span className="font-semibold text-primary">
          docker network inspect
        </span>
        , and{" "}
        <span className="font-semibold text-primary">
          docker compose config
        </span>
        .
      </p>

      <p className={bodyClass}>
        The investigation showed that the backend was attached to the
        expected{" "}
        <span className="font-semibold text-primary">
          chronicle_default
        </span>{" "}
        network, while the failed frontend container was not attached to any
        network.
      </p>

      <p className={bodyClass}>
        Recreating the frontend through Docker Compose attached it to the
        correct network. Docker's internal DNS could then resolve{" "}
        <span className="font-semibold text-primary">backend</span>, Nginx
        started successfully, and the application became available again.
      </p>
    </section>

    {/* 9. Recovery */}
    <section className={sectionClass}>
      <h2 className={headingClass}>9. Deployment and Recovery Testing</h2>

      <p className={bodyClass}>
        After the deployment was working, I tested the system beyond a normal
        deployment. The server was rebooted to verify that the Docker
        services could return to a working state without manually rebuilding
        the application.
      </p>

      <p className={bodyClass}>
        The MongoDB named volume preserved the database data across container
        recreation, while Docker and Compose restored the application
        services after the server came back online.
      </p>

      <p className={bodyClass}>
        This test was important because a deployment is not complete simply
        because the application works once. The environment also needs to
        behave predictably after updates, container recreation, and server
        restarts.
      </p>
    </section>

    {/* 10. Lessons */}
    <section className={sectionClass}>
      <h2 className={headingClass}>10. What I Learned</h2>

      <ul className={listClass}>
        <li>
          <span className="font-semibold text-primary">
            Docker images:
          </span>{" "}
          package application dependencies and runtime requirements so the
          server does not need to reproduce the development environment.
        </li>

        <li>
          <span className="font-semibold text-primary">
            Docker Compose:
          </span>{" "}
          provides a reproducible definition for how the application's
          containers, networks, volumes, and dependencies work together.
        </li>

        <li>
          <span className="font-semibold text-primary">
            Container networking:
          </span>{" "}
          service names such as <code>backend</code> and{" "}
          <code>mongodb</code> can be resolved through Docker's internal DNS.
        </li>

        <li>
          <span className="font-semibold text-primary">
            Persistent storage:
          </span>{" "}
          databases need storage that is independent from the lifecycle of
          their containers.
        </li>

        <li>
          <span className="font-semibold text-primary">
            CI/CD:
          </span>{" "}
          the deployment pipeline can move a change from GitHub to a running
          server without manually copying application source files.
        </li>

        <li>
          <span className="font-semibold text-primary">
            Debugging:
          </span>{" "}
          inspecting the actual container and network state is more reliable
          than assuming the Compose configuration reflects the current Docker
          state.
        </li>

        <li>
          <span className="font-semibold text-primary">
            Reliability:
          </span>{" "}
          reboot and recovery testing reveals deployment problems that are
          invisible during a normal successful deployment.
        </li>
      </ul>
    </section>

    <footer className="border-t border-primary/10 pt-8 text-base leading-relaxed text-secondary">
      <p>
        Chronicle started as a blogging application, but the deployment
        process became the more valuable part of the project. It provided a
        practical environment for understanding how application code,
        containers, networking, CI/CD, storage, and a Linux server fit
        together as one system.
      </p>
    </footer>
  </div>
);

export default ChronicleCaseStudy;